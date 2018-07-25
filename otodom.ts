#!/usr/bin/env node
'use strict'

import * as program from 'commander'
import * as fs from 'fs'
import * as moment from 'moment'
import * as path from 'path'
import * as puppeteer from 'puppeteer'

program
  .option('-o, --output-dir [dir]', 'katalog docelowy', './')
  .option(
    '-i, --input [file]',
    'json z zapisanymi danymi, możliwość kontynuacji'
  )
  .option('-q, --query <string>', 'co chcesz znaleźć?')
  .option('--no-headless', 'wymusza pokazanie okna chrome')
  .parse(process.argv)

console.log(program.headless)

const modalDialogClose = async page => {
  await page
    .waitForSelector(
      'body > div.bootbox.modal.fade.surveyMonkeyGTMPopup.in > div > div > div > button',
      {
        timeout: 3000
      }
    )
    .then(async e => {
      await e.click()
      await page.waitFor(1000)
    })
    .catch(() => {
      // * //
    })
}

const fillCity = async (page, city) => {
  await page
    .waitForSelector('span.select2-selection__rendered')
    .then(async e => {
      await e.click().then(async () => {
        await page.type(
          'body > span > span > span.select2-search.select2-search--dropdown > input',
          city,
          { delay: 100 }
        )
      })
    })
  await page.waitFor(1000)
  await Promise.all([
    page.click(
      'body > main > section.section-main-search > div > form > div > div.col-xs-12.col-md-2.col-action > button'
    ),
    page.waitForNavigation({
      waitUntil: 'networkidle0'
    })
  ])
}

const sortByDate = async page => {
  console.log('sortByDate')
  const link = await page.evaluate(() => {
    const elem = document.querySelector(
      '#sort_date_adding_newest > a'
    ) as HTMLAnchorElement
    console.log('sex', elem.href)
    return elem.href
  })
  await page.goto(link, {
    waitUntil: 'networkidle0'
  })
}

const getHouses = async page => {
  const items = await page.$$eval(
    '#body-container > div > div > div > div > article > div.offer-item-details',
    elems => {
      return [...elems].map(e => {
        return {
          address: e
            .querySelector('p')
            .innerText.split(':')[1]
            .trim(),
          area: parseInt(
            e.querySelector('li.offer-item-area').innerText.split(' ')[0],
            10
          ),
          price: parseInt(
            e
              .querySelector('li.offer-item-price')
              .innerText.split(' zł')[0]
              .split(' ')
              .join(''),
            10
          ),
          rooms: parseInt(
            e.querySelector('li.offer-item-rooms').innerText.split(' ')[0],
            10
          ),
          sqm: parseInt(
            e
              .querySelector('li.offer-item-price-per-m')
              .innerText.split(' zł')[0]
              .split(' ')
              .join(''),
            10
          ),
          title: e.querySelector('h3').innerText.trim(),
          url: e.querySelector('h3 > a').href
        }
      })
    }
  )

  return items.map(e => {
    e.date = moment().format('YYYY-MM-DD')
    return e
  })
}

const nextPage = async page => {
  const url = await page.$eval('#pagerForm > ul > li.pager-next > a', e => {
    return e.href
  })
  await page.goto(url)
}

const isLastPage = async (page, lastPage) => {
  const currentPage = await page.$eval('#pageParam', e => {
    return parseInt(e.placeholder, 10)
  })
  return currentPage === lastPage
}

async function main() {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: program.headless
  })
  const page = await browser.newPage()
  await page.setViewport({
    height: 768,
    width: 1320
  })
  await page.goto('https://www.otodom.pl/', {
    waitUntil: 'networkidle0'
  })
  const fileName =
    program.input || 'otodom_' + moment().format('YYYY_MM_DD') + '.json'
  let db
  let urls
  let lastPage = 0
  if (fs.existsSync(fileName)) {
    db = JSON.parse(fs.readFileSync(program.output).toString())
    urls = new Set(db.map(({ url }) => url))
  } else {
    db = []
    urls = new Set()
  }
  await modalDialogClose(page)
  await fillCity(page, program.query)
  await modalDialogClose(page)
  await sortByDate(page)
  await modalDialogClose(page)
  let notLastPage = true
  while (notLastPage) {
    console.log('lastPage', lastPage)
    notLastPage = !(await isLastPage(page, lastPage))
    const houses = await getHouses(page)
    for (const house of houses) {
      if (!urls.has(house.url)) {
        db.push(house)
        urls.add(house.url)
      }
    }
    fs.writeFileSync(
      path.join(program.outputDir, fileName),
      JSON.stringify(db, null, 2)
    )
    lastPage++
    await nextPage(page)
  }
  browser.close()
}

main()
