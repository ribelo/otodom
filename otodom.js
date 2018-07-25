#!/usr/bin/env node
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var program = require("commander");
var fs = require("fs");
var moment = require("moment");
var path = require("path");
var puppeteer = require("puppeteer");
program
    .option('-o, --output-dir [dir]', '', './')
    .option('-i, --input [file]')
    .option('-q, --query <string>')
    .option('--no-headless')
    .parse(process.argv);
var modalDialogClose = function (page) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page
                    .waitForSelector('body > div.bootbox.modal.fade.surveyMonkeyGTMPopup.in > div > div > div > button', {
                    timeout: 3000
                })
                    .then(function (e) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, e.click()];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, page.waitFor(1000)];
                            case 2:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })["catch"](function () {
                    // * //
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var fillCity = function (page, city) { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page
                    .waitForSelector('span.select2-selection__rendered')
                    .then(function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, e.click().then(function () { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, page.type('body > span > span > span.select2-search.select2-search--dropdown > input', city, { delay: 100 })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); })];
            case 1:
                _a.sent();
                return [4 /*yield*/, page.waitFor(1000)];
            case 2:
                _a.sent();
                return [4 /*yield*/, Promise.all([
                        page.click('body > main > section.section-main-search > div > form > div > div.col-xs-12.col-md-2.col-action > button'),
                        page.waitForNavigation({
                            waitUntil: 'networkidle0'
                        })
                    ])];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var sortByDate = function (page) { return __awaiter(_this, void 0, void 0, function () {
    var link;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('sortByDate');
                return [4 /*yield*/, page.evaluate(function () {
                        return document.querySelector('#sort_date_adding_newest > a').href;
                    })];
            case 1:
                link = _a.sent();
                return [4 /*yield*/, page.goto(link, {
                        waitUntil: 'networkidle0'
                    })];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var getHouses = function (page) { return __awaiter(_this, void 0, void 0, function () {
    var items;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.$$eval('#body-container > div > div > div > div > article > div.offer-item-details', function (elems) {
                    return elems.slice().map(function (e) {
                        return {
                            address: e
                                .querySelector('p')
                                .innerText.split(':')[1]
                                .trim(),
                            area: parseInt(e.querySelector('li.offer-item-area').innerText.split(' ')[0], 10),
                            price: parseInt(e
                                .querySelector('li.offer-item-price')
                                .innerText.split(' zł')[0]
                                .split(' ')
                                .join(''), 10),
                            pricePerM: parseInt(e
                                .querySelector('li.offer-item-price-per-m')
                                .innerText.split(' zł')[0]
                                .split(' ')
                                .join(''), 10),
                            rooms: parseInt(e.querySelector('li.offer-item-rooms').innerText.split(' ')[0], 10),
                            title: e.querySelector('h3').innerText.trim(),
                            url: e.querySelector('h3 > a').href
                        };
                    });
                })];
            case 1:
                items = _a.sent();
                return [2 /*return*/, items.map(function (e) {
                        e.date = moment().format('YYYY-MM-DD');
                        return e;
                    })];
        }
    });
}); };
var nextPage = function (page) { return __awaiter(_this, void 0, void 0, function () {
    var url;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.$eval('#pagerForm > ul > li.pager-next > a', function (e) {
                    return e.href;
                })];
            case 1:
                url = _a.sent();
                return [4 /*yield*/, page.goto(url)];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var isLastPage = function (page, lastPage) { return __awaiter(_this, void 0, void 0, function () {
    var currentPage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, page.$eval('#pageParam', function (e) {
                    return parseInt(e.placeholder, 10);
                })];
            case 1:
                currentPage = _a.sent();
                return [2 /*return*/, currentPage === lastPage];
        }
    });
}); };
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, fileName, db, urls, lastPage, notLastPage, houses, _i, houses_1, house;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({
                        // slowMo: 100,
                        args: ['--no-sandbox'],
                        headless: !program.noHeadless
                    })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.setViewport({
                            height: 768,
                            width: 1320
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.goto('https://www.otodom.pl/', {
                            waitUntil: 'networkidle0'
                        })];
                case 4:
                    _a.sent();
                    fileName = program.input || 'otodom_' + moment().format('YYYY_MM_DD') + '.json';
                    lastPage = 0;
                    if (fs.existsSync(fileName)) {
                        db = JSON.parse(fs.readFileSync(program.output).toString());
                        urls = new Set(db.map(function (_a) {
                            var url = _a.url;
                            return url;
                        }));
                    }
                    else {
                        db = [];
                        urls = new Set();
                    }
                    return [4 /*yield*/, modalDialogClose(page)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, fillCity(page, program.query)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, modalDialogClose(page)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, sortByDate(page)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, modalDialogClose(page)];
                case 9:
                    _a.sent();
                    notLastPage = true;
                    _a.label = 10;
                case 10:
                    if (!notLastPage) return [3 /*break*/, 14];
                    return [4 /*yield*/, isLastPage(page, lastPage)];
                case 11:
                    notLastPage = !(_a.sent());
                    return [4 /*yield*/, getHouses(page)];
                case 12:
                    houses = _a.sent();
                    for (_i = 0, houses_1 = houses; _i < houses_1.length; _i++) {
                        house = houses_1[_i];
                        if (!urls.has(house.url)) {
                            db.push(house);
                            urls.add(house.url);
                        }
                    }
                    fs.writeFileSync(path.join(program.output, fileName), JSON.stringify(db, null, 2));
                    lastPage++;
                    return [4 /*yield*/, nextPage(page)];
                case 13:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 14:
                    browser.close();
                    return [2 /*return*/];
            }
        });
    });
}
main();
