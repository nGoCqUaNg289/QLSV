/*
Stimulsoft.Reports.JS
Version: 2016.3
Build date: 2016.12.15
*/
function hex_md5(A) {
    return rstr2hex(rstr_md5(str2rstr_utf8(A)))
}
function hex_hmac_md5(A, e) {
    return rstr2hex(rstr_hmac_md5(str2rstr_utf8(A), str2rstr_utf8(e)))
}
function md5_vm_test() {
    return "900150983cd24fb0d6963f7d28e17f72" == hex_md5("abc").toLowerCase()
}
function rstr_md5(A) {
    return binl2rstr(binl_md5(rstr2binl(A), 8 * A.length))
}
function rstr_hmac_md5(A, e) {
    var t = rstr2binl(A);
    t.length > 16 && (t = binl_md5(t, 8 * A.length));
    for (var o = Array(16), i = Array(16), s = 0; s < 16; s++)
        o[s] = 909522486 ^ t[s],
        i[s] = 1549556828 ^ t[s];
    var n = binl_md5(o.concat(rstr2binl(e)), 512 + 8 * e.length);
    return binl2rstr(binl_md5(i.concat(n), 512 + 128))
}
function rstr2hex(A) {
    try {} catch (A) {
        hexcase = 0
    }
    for (var e = hexcase ? "0123456789ABCDEF" : "0123456789abcdef", t = "", o, i = 0; i < A.length; i++)
        o = A.charCodeAt(i),
        t += e.charAt(o >>> 4 & 15) + e.charAt(15 & o);
    return t
}
function str2rstr_utf8(A) {
    var e = "", t = -1, o, i;
    while (++t < A.length)
        o = A.charCodeAt(t),
        i = t + 1 < A.length ? A.charCodeAt(t + 1) : 0,
        55296 <= o && o <= 56319 && 56320 <= i && i <= 57343 && (o = 65536 + ((1023 & o) << 10) + (1023 & i),
        t++),
        o <= 127 ? e += String.fromCharCode(o) : o <= 2047 ? e += String.fromCharCode(192 | o >>> 6 & 31, 128 | 63 & o) : o <= 65535 ? e += String.fromCharCode(224 | o >>> 12 & 15, 128 | o >>> 6 & 63, 128 | 63 & o) : o <= 2097151 && (e += String.fromCharCode(240 | o >>> 18 & 7, 128 | o >>> 12 & 63, 128 | o >>> 6 & 63, 128 | 63 & o));
    return e
}
function rstr2binl(A) {
    for (var e = Array(A.length >> 2), t = 0; t < e.length; t++)
        e[t] = 0;
    for (var t = 0; t < 8 * A.length; t += 8)
        e[t >> 5] |= (255 & A.charCodeAt(t / 8)) << t % 32;
    return e
}
function binl2rstr(A) {
    for (var e = "", t = 0; t < 32 * A.length; t += 8)
        e += String.fromCharCode(A[t >> 5] >>> t % 32 & 255);
    return e
}
function binl_md5(A, e) {
    A[e >> 5] |= 128 << e % 32,
    A[(e + 64 >>> 9 << 4) + 14] = e;
    for (var t = 1732584193, o = -271733879, i = -1732584194, s = 271733878, n = 0; n < A.length; n += 16) {
        var a = t
          , r = o
          , l = i
          , c = s;
        t = md5_ff(t, o, i, s, A[n + 0], 7, -680876936),
        s = md5_ff(s, t, o, i, A[n + 1], 12, -389564586),
        i = md5_ff(i, s, t, o, A[n + 2], 17, 606105819),
        o = md5_ff(o, i, s, t, A[n + 3], 22, -1044525330),
        t = md5_ff(t, o, i, s, A[n + 4], 7, -176418897),
        s = md5_ff(s, t, o, i, A[n + 5], 12, 1200080426),
        i = md5_ff(i, s, t, o, A[n + 6], 17, -1473231341),
        o = md5_ff(o, i, s, t, A[n + 7], 22, -45705983),
        t = md5_ff(t, o, i, s, A[n + 8], 7, 1770035416),
        s = md5_ff(s, t, o, i, A[n + 9], 12, -1958414417),
        i = md5_ff(i, s, t, o, A[n + 10], 17, -42063),
        o = md5_ff(o, i, s, t, A[n + 11], 22, -1990404162),
        t = md5_ff(t, o, i, s, A[n + 12], 7, 1804603682),
        s = md5_ff(s, t, o, i, A[n + 13], 12, -40341101),
        i = md5_ff(i, s, t, o, A[n + 14], 17, -1502002290),
        o = md5_ff(o, i, s, t, A[n + 15], 22, 1236535329),
        t = md5_gg(t, o, i, s, A[n + 1], 5, -165796510),
        s = md5_gg(s, t, o, i, A[n + 6], 9, -1069501632),
        i = md5_gg(i, s, t, o, A[n + 11], 14, 643717713),
        o = md5_gg(o, i, s, t, A[n + 0], 20, -373897302),
        t = md5_gg(t, o, i, s, A[n + 5], 5, -701558691),
        s = md5_gg(s, t, o, i, A[n + 10], 9, 38016083),
        i = md5_gg(i, s, t, o, A[n + 15], 14, -660478335),
        o = md5_gg(o, i, s, t, A[n + 4], 20, -405537848),
        t = md5_gg(t, o, i, s, A[n + 9], 5, 568446438),
        s = md5_gg(s, t, o, i, A[n + 14], 9, -1019803690),
        i = md5_gg(i, s, t, o, A[n + 3], 14, -187363961),
        o = md5_gg(o, i, s, t, A[n + 8], 20, 1163531501),
        t = md5_gg(t, o, i, s, A[n + 13], 5, -1444681467),
        s = md5_gg(s, t, o, i, A[n + 2], 9, -51403784),
        i = md5_gg(i, s, t, o, A[n + 7], 14, 1735328473),
        o = md5_gg(o, i, s, t, A[n + 12], 20, -1926607734),
        t = md5_hh(t, o, i, s, A[n + 5], 4, -378558),
        s = md5_hh(s, t, o, i, A[n + 8], 11, -2022574463),
        i = md5_hh(i, s, t, o, A[n + 11], 16, 1839030562),
        o = md5_hh(o, i, s, t, A[n + 14], 23, -35309556),
        t = md5_hh(t, o, i, s, A[n + 1], 4, -1530992060),
        s = md5_hh(s, t, o, i, A[n + 4], 11, 1272893353),
        i = md5_hh(i, s, t, o, A[n + 7], 16, -155497632),
        o = md5_hh(o, i, s, t, A[n + 10], 23, -1094730640),
        t = md5_hh(t, o, i, s, A[n + 13], 4, 681279174),
        s = md5_hh(s, t, o, i, A[n + 0], 11, -358537222),
        i = md5_hh(i, s, t, o, A[n + 3], 16, -722521979),
        o = md5_hh(o, i, s, t, A[n + 6], 23, 76029189),
        t = md5_hh(t, o, i, s, A[n + 9], 4, -640364487),
        s = md5_hh(s, t, o, i, A[n + 12], 11, -421815835),
        i = md5_hh(i, s, t, o, A[n + 15], 16, 530742520),
        o = md5_hh(o, i, s, t, A[n + 2], 23, -995338651),
        t = md5_ii(t, o, i, s, A[n + 0], 6, -198630844),
        s = md5_ii(s, t, o, i, A[n + 7], 10, 1126891415),
        i = md5_ii(i, s, t, o, A[n + 14], 15, -1416354905),
        o = md5_ii(o, i, s, t, A[n + 5], 21, -57434055),
        t = md5_ii(t, o, i, s, A[n + 12], 6, 1700485571),
        s = md5_ii(s, t, o, i, A[n + 3], 10, -1894986606),
        i = md5_ii(i, s, t, o, A[n + 10], 15, -1051523),
        o = md5_ii(o, i, s, t, A[n + 1], 21, -2054922799),
        t = md5_ii(t, o, i, s, A[n + 8], 6, 1873313359),
        s = md5_ii(s, t, o, i, A[n + 15], 10, -30611744),
        i = md5_ii(i, s, t, o, A[n + 6], 15, -1560198380),
        o = md5_ii(o, i, s, t, A[n + 13], 21, 1309151649),
        t = md5_ii(t, o, i, s, A[n + 4], 6, -145523070),
        s = md5_ii(s, t, o, i, A[n + 11], 10, -1120210379),
        i = md5_ii(i, s, t, o, A[n + 2], 15, 718787259),
        o = md5_ii(o, i, s, t, A[n + 9], 21, -343485551),
        t = safe_add(t, a),
        o = safe_add(o, r),
        i = safe_add(i, l),
        s = safe_add(s, c)
    }
    return Array(t, o, i, s)
}
function md5_cmn(A, e, t, o, i, s) {
    return safe_add(bit_rol(safe_add(safe_add(e, A), safe_add(o, s)), i), t)
}
function md5_ff(A, e, t, o, i, s, n) {
    return md5_cmn(e & t | ~e & o, A, e, i, s, n)
}
function md5_gg(A, e, t, o, i, s, n) {
    return md5_cmn(e & o | t & ~o, A, e, i, s, n)
}
function md5_hh(A, e, t, o, i, s, n) {
    return md5_cmn(e ^ t ^ o, A, e, i, s, n)
}
function md5_ii(A, e, t, o, i, s, n) {
    return md5_cmn(t ^ (e | ~o), A, e, i, s, n)
}
function safe_add(A, e) {
    var t = (65535 & A) + (65535 & e)
      , o = (A >> 16) + (e >> 16) + (t >> 16);
    return o << 16 | 65535 & t
}
function bit_rol(A, e) {
    return A << e | A >>> 32 - e
}
function stiTreeNode(A, e, t, o, i) {
    this.id = A,
    this.pid = e,
    this.name = t,
    this.url = o ? o.replace(/'/g, "\\'") : o,
    this.title = i,
    null == this.page,
    i && (this.page = parseInt(i.substr(5)) - 1),
    this.target = null,
    this.icon = null,
    this.iconOpen = null,
    this._io = !1,
    this._is = !1,
    this._ls = !1,
    this._hc = !1,
    this._ai = 0,
    this._p
}
function stiTree(A, e, t, o) {
    this.config = {
        target: null,
        folderLinks: !0,
        useSelection: !0,
        useCookies: !1,
        useLines: !0,
        useIcons: !0,
        useStatusText: !1,
        closeSameLevel: !1,
        inOrder: !1
    },
    this.icon = {
        nlPlus: "img/nolines_plus.gif",
        nlMinus: "img/nolines_minus.gif"
    };
    for (var i in o)
        this.icon[i] = o[i];
    this.obj = A,
    this.mobileViewerId = e,
    this.currentPageNumber = t,
    this.aNodes = [],
    this.aIndent = [],
    this.root = new stiTreeNode((-1)),
    this.selectedNode = null,
    this.selectedFound = !1,
    this.completed = !1
}
function StiJsViewer(A) {
    if (this.defaultParameters = {
        options: {
            reportGuid: "439b3a37247d48c38be593d535cf4275",
            clientGuid: "af8a336b5bfb482ea864ed8a78659acc",
            requestStylesUrl: "/Default.aspx",
            exports: {
                showExportToDif: !0,
                showExportToCsv: !0,
                storeExportSettings: !0,
                showExportToImageMetafile: !0,
                showExportToHtml: !0,
                showExportToImageSvg: !0,
                showExportToRtf: !0,
                showExportToImagePcx: !0,
                showExportToOpenDocumentWriter: !0,
                showExportToImageTiff: !0,
                showExportToExcelXml: !0,
                showExportToImagePng: !0,
                showExportToOpenDocumentCalc: !0,
                showExportToDocument: !0,
                showExportToPowerPoint: !0,
                showExportToXml: !0,
                showExportDialog: !0,
                showExportToWord2007: !0,
                showExportToImageGif: !0,
                showExportToImageJpeg: !0,
                showExportToExcel: !0,
                showExportToImageSvgz: !0,
                showExportToExcel2007: !0,
                showExportToImageBmp: !0,
                showExportToText: !0,
                showExportToMht: !0,
                showExportToXps: !0,
                showExportToSylk: !0,
                showExportToHtml5: !0,
                showExportToPdf: !0,
                showExportToDbf: !0
            },
            actions: {
                viewerEvent: "ViewerEvent"
            },
            appearance: {
                storeExportSettings: !0,
                reportDisplayMode: "Table",
                interfaceType: "Auto",
                openLinksTarget: "_blank",
                rightToLeft: !1,
                scrollbarsMode: !1,
                showTooltips: !0,
                designTarget: "_self",
                bookmarksPrint: !1,
                openExportedReportTarget: "_blank",
                parametersPanelColumnsCount: 2,
                showTooltipsHelp: !0,
                datePickerFirstDayOfWeek: "Monday",
                backgroundColor: "White",
                bookmarksTreeWidth: 180,
                showPageShadow: !0,
                parametersPanelDateFormat: "",
                fullScreenMode: !1,
                chartRenderType: "AnimatedVector",
                pageAlignment: "Center",
                parametersPanelMaxHeight: 300,
                pageBorderColor: "Gray"
            },
            toolbar: {
                showPreviousPageButton: !0,
                showFirstPageButton: !0,
                showZoomButton: !0,
                showFindButton: !0,
                showPrintButton: !0,
                showSaveButton: !0,
                showSendEmailButton: !1,
                zoom: 100,
                showButtonCaptions: !0,
                alignment: "Default",
                fontColor: "",
                showEditorButton: !0,
                showFullScreenButton: !0,
                showMenuMode: "Click",
                backgroundColor: "",
                showViewModeButton: !0,
                showDesignButton: !1,
                printDestination: "Default",
                showNextPageButton: !0,
                showCurrentPageControl: !0,
                showBookmarksButton: !0,
                showAboutButton: !0,
                fontFamily: "Arial",
                showLastPageButton: !0,
                menuAnimation: !0,
                visible: !0,
                showParametersButton: !0,
                borderColor: "",
                viewMode: "OnePage"
            },
            shortProductVersion: "2016.3",
            requestUrl: "/Default.aspx",
            server: {
                cacheItemPriority: "Default",
                requestTimeout: 20,
                globalReportCache: !1,
                cacheTimeout: 20,
                passQueryParametersForResources: !0,
                cacheMode: "ObjectCache",
                useRelativeUrls: !0
            },
            productVersion: "2016.3 ",
            email: {
                showEmailDialog: !0,
                defaultEmailMessage: "",
                defaultEmailSubject: "",
                defaultEmailAddress: "",
                showExportDialog: !0
            },
            cultureName: "en",
            viewerHeightType: "Percentage",
            viewerId: "StiWebViewer1",
            theme: "Office2013",
            requestAbsoluteUrl: "http://localhost:19244/Default.aspx"
        },
        defaultExportSettings: {
            StiOdsExportSettings: {
                ImageQuality: .75,
                ImageResolution: 100,
                PageRange: "All"
            },
            StiXpsExportSettings: {
                ImageQuality: .75,
                ExportRtfTextAsImage: !1,
                ImageResolution: 100,
                PageRange: "All"
            },
            StiTxtExportSettings: {
                ZoomX: 1,
                CutLongLines: !0,
                ZoomY: 1,
                EscapeCodesCollectionName: null,
                Encoding: "65001",
                KillSpaceLines: !0,
                PageRange: "All",
                KillSpaceGraphLines: !0,
                UseEscapeCodes: !1,
                BorderType: "UnicodeSingle",
                DrawBorder: !0,
                PutFeedPageCode: !0
            },
            StiPdfExportSettings: {
                SubjectNameString: "",
                ImageResolutionMode: "Exactly",
                DitheringType: "FloydSteinberg",
                UseLocalMachineCertificates: !1,
                ImageQuality: .75,
                ExportRtfTextAsImage: !1,
                DigitalSignatureSignedBy: null,
                KeyLength: "Bit40",
                UseUnicode: !0,
                PdfACompliance: !1,
                PasswordInputOwner: "",
                AutoPrintMode: "None",
                ImageResolution: 100,
                StandardPdfFonts: !1,
                AllowEditable: "No",
                DigitalSignatureLocation: null,
                GetCertificateFromCryptoUI: !0,
                CreatorString: "",
                Compressed: !0,
                KeywordsString: "",
                CertificateData: null,
                UserAccessPrivileges: "All",
                DigitalSignatureReason: null,
                ImageFormat: "Color",
                ImageCompressionMethod: "Jpeg",
                PageRange: "All",
                EmbeddedFiles: [],
                PasswordInputUser: "",
                ZUGFeRDCompliance: !1,
                EmbeddedFonts: !0,
                DigitalSignatureContactInfo: null,
                CertificatePassword: null,
                PdfComplianceMode: "None",
                UseDigitalSignature: !1
            },
            StiRtfExportSettings: {
                PageRange: "All",
                RemoveEmptySpaceAtBottom: !0,
                ExportMode: "Table",
                ImageResolution: 100,
                ImageQuality: .75,
                CodePage: 0,
                StoreImagesAsPng: !1,
                UsePageHeadersAndFooters: !1
            },
            StiWord2007ExportSettings: {
                PageRange: "All",
                RemoveEmptySpaceAtBottom: !0,
                ImageResolution: 100,
                RestrictEditing: "No",
                ImageQuality: .75,
                UsePageHeadersAndFooters: !1
            },
            StiImageExportSettings: {
                ImageZoom: 1,
                ImageType: "Jpeg",
                TiffCompressionScheme: "Default",
                CutEdges: !1,
                ImageResolution: 100,
                ImageFormat: "Color",
                DitheringType: "FloydSteinberg",
                MultipleFiles: !1,
                PageRange: "All"
            },
            StiHtmlExportSettings: {
                RemoveEmptySpaceAtBottom: !0,
                AddPageBreaks: !0,
                ImageResolution: 96,
                ContinuousPages: !0,
                OpenLinksTarget: null,
                UseWatermarkMargins: !1,
                PageHorAlignment: "Left",
                PageRange: "All",
                HtmlType: "Html",
                ChartType: "AnimatedVector",
                Zoom: 1,
                ImageFormat: "Png",
                ExportQuality: "High",
                ExportBookmarksMode: "All",
                UseEmbeddedImages: !1,
                ImageQuality: .75,
                CompressToArchive: !1,
                BookmarksTreeWidth: 150,
                Encoding: "65001",
                UseStylesTable: !0,
                ExportMode: "Table"
            },
            StiDataExportSettings: {
                UseDefaultSystemEncoding: !0,
                Separator: ",",
                PageRange: "All",
                Encoding: "65001",
                DataExportMode: "Data",
                CodePage: "Default",
                SkipColumnHeaders: !1,
                ExportDataOnly: !1,
                DataType: "Csv"
            },
            StiPpt2007ExportSettings: {
                ImageQuality: .75,
                ImageResolution: 100,
                PageRange: "All"
            },
            StiOdtExportSettings: {
                UsePageHeadersAndFooters: !1,
                ImageQuality: .75,
                PageRange: "All",
                ImageResolution: 100,
                RemoveEmptySpaceAtBottom: !0
            },
            StiExcelExportSettings: {
                PageRange: "All",
                ExportPageBreaks: !1,
                ImageResolution: 100,
                UseOnePageHeaderAndFooter: !1,
                ExcelType: "ExcelBinary",
                ImageQuality: .75,
                ExportEachPageToSheet: !1,
                RestrictEditing: "No",
                ExportDataOnly: !1,
                ExportObjectFormatting: !0
            }
        }
    },
    this.mergeOptions(A, this.defaultParameters),
    A = this.defaultParameters,
    this.options = A.options,
    this.options.isTouchDevice = "Auto" == this.options.appearance.interfaceType ? this.IsTouchDevice() : "Touch" == this.options.appearance.interfaceType,
    this.options.menuAnimDuration = 150,
    this.options.formAnimDuration = 200,
    this.options.scrollDuration = 350,
    this.options.firstZoomDistance = 0,
    this.options.secondZoomDistance = 0,
    this.options.menuHideDelay = 250,
    this.options.zoomStep = 0,
    this.options.toolbar.backgroundColor = this.getHTMLColor(this.options.toolbar.backgroundColor),
    this.options.toolbar.borderColor = this.getHTMLColor(this.options.toolbar.borderColor),
    this.options.toolbar.fontColor = this.getHTMLColor(this.options.toolbar.fontColor),
    this.options.appearance.pageBorderColor = this.getHTMLColor(this.options.appearance.pageBorderColor),
    this.options.exports.defaultSettings = A.defaultExportSettings,
    this.options.parametersValues = {},
    this.options.parameterRowHeight = this.options.isTouchDevice ? 35 : 30,
    this.collections = {
        encodingData: [{
            key: "1251",
            value: "Cyrillic (Windows)"
        }, {
            key: "20127",
            value: "US-ASCII"
        }, {
            key: "1201",
            value: "Unicode (Big-Endian)"
        }, {
            key: "1200",
            value: "Unicode"
        }, {
            key: "65000",
            value: "Unicode (UTF-7)"
        }, {
            key: "65001",
            value: "Unicode (UTF-8)"
        }, {
            key: "1250",
            value: "Central European (Windows)"
        }, {
            key: "1251",
            value: "Cyrillic (Windows)"
        }, {
            key: "1252",
            value: "Western European (Windows)"
        }, {
            key: "1253",
            value: "Greek (Windows)"
        }, {
            key: "1254",
            value: "Turkish (Windows)"
        }, {
            key: "1255",
            value: "Hebrew (Windows)"
        }, {
            key: "1256",
            value: "Arabic (Windows)"
        }],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        loc: {
            OwnerPassword: "Owner Password:",
            ExportMode: "Export Mode:",
            ButtonCancel: "Cancel",
            MonthJuly: "July",
            Save: "Save",
            BandsFilterTooltip: "Apply a filter condition when exporting. Data Only - only data bands (Table component, Hierarchical Band) will be exported. Data and Headers/Footers - data bands (Table component, Hierarchical Band) and their headers/footers will be exported. All Bands - All the report bands will be exported.",
            FullScreenToolTip: "Full screen reading.",
            ExportModeTooltip: "Apply a filter condition when exporting. Data Only - only data bands (Table component, Hierarchical Band) will be exported. Data and Headers/Footers - data bands (Table component, Hierarchical Band) and their headers/footers will be exported. All Bands - All the report bands will be exported.",
            PagesRangeCurrentPageTooltip: "Processing the current page. If this option is selected, then a selected report page will be processed.",
            CurrentQuarter: "Current Quarter",
            MultipleFiles: "Multiple Files",
            Separator: "Separator:",
            NameYes: "Yes",
            RangeTo: "To",
            AllowCopyTextAndGraphicsTooltip: "Limited access to copying information.",
            QuarterToDate: "Quarter To Date",
            SaveRtf: "Rich Text File...",
            FindPrevious: "Find Previous",
            BorderTypeDouble: "Unicode-Double",
            ZoomPageWidth: "Page Width",
            SaveHtml: "HTML File...",
            PagesRangeAll: "All",
            PreviousWeek: "Previous Week",
            ImageQualityTooltip: "Allows you to choose the ratio of the image quality/size of the file. The higher the quality is, the larger is the size of the finished file.",
            ZoomHtml: "Scale:",
            DayMonday: "Monday",
            Today: "Today",
            ExportModeRtfTable: "Table",
            ParametersToolTip: "Showing parameters panel which is used when report rendering.",
            TypeTooltip: "The file the report will be converted into.",
            RemoveEmptySpaceTooltip: "Minimize the empty space at the bottom of the page.",
            MonthJanuary: "January",
            EncryptionKeyLengthTooltip: "The length of the encryption key. The longer the length is, the more difficult it is to decrypt the document, and, accordingly, the document security is on higher priority.",
            UseOnePageHeaderFooterTooltip: "Define the page bands Header and Footer as the header and footer of the Microsoft Word document.",
            StandardPDFFontsTooltip: "14 standard Adobe fonts. If this option is enabled, then only standard 14 fonts will be used in the PDF file. All report fonts are converted into them.",
            SavingReport: "Saving Report",
            Version: "Version",
            OpenAfterExportTooltip: "Automatic opening of the created document (after export) by the program set for these file types.",
            GetCertificateFromCryptoUITooltip: "Using the interface of the system cryptography library.",
            BandsFilterDataOnly: "Data only",
            ButtonOk: "OK",
            Compressed: "Compressed",
            MonthApril: "April",
            ImageFormatColor: "Color",
            UseDigitalSignatureTooltip: "The digital signature of the file.",
            BookmarksToolTip: "Show the bookmark panel that is used for quick navigation to jump directly to a bookmarked location.",
            AddPageBreaks: "Add Page Breaks",
            MonthMay: "May",
            ImageFormatGrayscale: "Grayscale",
            SecondQuarter: "Second Quarter",
            AllowAddOrModifyTextAnnotationsTooltip: "Limited access to work with annotations in the document.",
            ImageFormatForHtml: "Image Format:",
            FindWhat: "Find What:",
            SubjectNameString: "Subject Name String:",
            DocumentSecurityButton: "Document Security",
            TellMeMore: "Tell me more",
            ExportRtfTextAsImageTooltip: "Convert the RTF text into the image. If the option is enabled, then, when exporting, RichText decomposes into simpler primitives supported by the PDF format. RichText with complex formatting (embedded images, tables) cannot always be converted correctly. In this case it is recommended to enable this option.",
            UsePageHeadersFootersTooltip: "Define the bands Page Header and Footer as the header and footer of the document in Microsoft Word.",
            ImageCompressionMethodTooltip: "The compression method: JPEG - this may cause loss of quality, Flate ??? no quality loss, Simple, Ordered, FloydSt. - images are output in monochrome.",
            Loading: "Loading",
            SaveImage: "Image File...",
            NextWeek: "Next Week",
            AllowPrintDocument: "Allow Print Document",
            ImageResolutionTooltip: "The number of pixels per inch. The higher the number of pixels is, the better is the quality of the image. The size of the finished file is much larger.",
            PdfAComplianceTooltip: "Support for the standard of the long-term archiving and storing of electronic documents.",
            PrintWithPreview: "Print with Preview",
            BorderTypeTooltip: "The border type of components: simple - drawing borders of components with characters +, -, |; Unicode single - drawing the borders with single box-drawing characters, Unicode double - drawing the borders with double box-drawing characters.",
            SaveReportMdx: "Encrypted Document File (.mdx)",
            CompressToArchiveTooltip: "Pack all files and folders in the zip archive.",
            AllowAddOrModifyTextAnnotations: "Allow Add or Modify Text Annotations",
            Subject: "Subject:",
            SubjectNameStringTooltip: "Certificate identifier. The identifier is the name of the certificate owner (full line) or a part of the name (substring).",
            DigitalSignatureButton: "Digital Signature",
            DayWednesday: "Wednesday",
            Time: "Time",
            EmbeddedImageDataTooltip: "Embed images directly into the HTML file.",
            CutEdges: "Cut Edges",
            ContinuousPagesTooltip: "The mode of placing report pages as a vertical strip.",
            SaveReportMdc: "Document File (.mdc)",
            SettingsGroup: "Settings",
            PagesRangeCurrentPage: "Current Page",
            AllowEditable: "Allow Editable:",
            UseDefaultSystemEncoding: "Use Default System Encoding",
            NextQuarter: "Next Quarter",
            ImageFormatTooltip: "The color scheme of the image: color - image after exporting will fully match the image in the viewer; gray ??? an image after exporting will be of the gray shade; monochrome - the images will be strictly black and white. At the same time, it should be considered that the monochrome has three modes None, Ordered, FloydSt.",
            CurrentMonth: "Current Month",
            CutLongLines: "Cut Long Lines",
            PutFeedPageCode: "Put Feed Page Code",
            Yesterday: "Yesterday",
            CompressToArchive: "Compress to Archive",
            DrawBorderTooltip: "Drawing the borders of components with graphic characters.",
            PutFeedPageCodeTooltip: "Feed pages in the final document with a special character.",
            DayTuesday: "Tuesday",
            WholeReport: "Whole Report",
            WeekToDate: "Week To Date",
            UseDigitalSignature: "Use Digital Signature",
            ExportDataOnly: "Export Data Only",
            Submit: "Submit",
            CutLongLinesTooltip: "Trim the long lines (text lines) by the borders of components.",
            NextPageToolTip: "Go to the next report page.",
            ExportModeRtfTooltip: "Presentation of the report data after export. The Table - the report will look like a table, where each report component is a table cell. Frame - each component will look like a single frame, but without any relationship between them.",
            ExportDataOnlyTooltip: "Export only Data bands (the Table component, Hierachical band).",
            CurrentWeek: "Current Week",
            AllowModifyContentsTooltip: "Limited access to the text editing.",
            Email: "Email:",
            SaveWord2007: "Microsoft Word File...",
            CutEdgesTooltip: "Trim the borders of report pages.",
            FindNext: "Find Next",
            UserPassword: "User Password:",
            PrintToolTip: "Print a report.",
            SaveExcel: "Microsoft Excel File...",
            UseDefaultSystemEncodingTooltip: "Use system coding by default or specify the encoding by standard.",
            DayFriday: "Friday",
            PrevPageToolTip: "Go to the previous report page.",
            FirstQuarter: "First Quarter",
            LastPageToolTip: "Go to the last report page.",
            ImageFormat: "Image Type",
            EncodingDbfFile: "Encoding:",
            PrintWithoutPreview: "Print without Preview",
            DaySaturday: "Saturday",
            BorderTypeSimple: "Simple",
            SaveData: "Data File...",
            SeparatorTooltip: "Separator between the data in the CSV file.",
            AllowModifyContents: "Allow Modify Contents",
            EncryptionKeyLength: "Encryption Key Length:",
            SaveDocument: "Document File...",
            CompressedTooltip: "Compression of the ready document. It is recommended to always include file compression.",
            UseUnicode: "Use Unicode",
            EmailSuccessfullySent: "The Email has been successfully sent.",
            ExportEachPageToSheetTooltip: "Export each report page in a separate Excel sheet.",
            SaveXps: "Microsoft XPS File...",
            NextMonth: "Next Month",
            ZoomOnePage: "Page Height",
            Design: "Design",
            MonthToDate: "Month To Date",
            UseUnicodeTooltip: "Extended support for encoding characters. It affects on the internal character encoding within the PDF file, and improves the copying of the text from the PDF file.",
            Bookmarks: "Bookmarks",
            Close: "Close",
            MonthDecember: "December",
            ExportRtfTextAsImage: "Export Rich Text as Image",
            ZoomXY: "Zoom:",
            MonthOctober: "October",
            UseOnePageHeaderFooter: "Use One Page Header and Footer",
            MonthMarch: "March",
            SaveText: "Text File...",
            TiffCompressionSchemeTooltip: "Compression scheme for TIFF files.",
            EncodingDifFile: "Encoding:",
            AddPageBreaksTooltip: "Visual separator of report pages.",
            FirstPageToolTip: "Go to the first report page.",
            PreviousQuarter: "Previous Quarter",
            UsePageHeadersFooters: "Use Page Headers and Footers",
            DrawBorder: "Draw Border",
            MatchCase: "Match &Case",
            ImageCompressionMethod: "Image Compression Method:",
            AllowEditableTooltip: "Allows changing components with the Editable property enabled.",
            BandsFilter: "Bands Filter:",
            PagesRangePages: "Pages:",
            PreviousMonth: "Previous Month",
            PasswordSaveReport: "Password:",
            StandardPDFFonts: "Standard PDF Fonts",
            NameNo: "No",
            BandsFilterDataAndHeadersFooters: "Data and Headers/Footers",
            SaveOdt: "OpenDocument Writer File...",
            KillSpaceLines: "Kill Space Lines",
            Page: "Page",
            ViewModeToolTip: "View Mode",
            MonochromeDitheringTypeTooltip: "Dithering type: None - no dithering, Ordered, FloydSt. - with dithering.",
            FormViewerTitle: "Viewer",
            MonthAugust: "August",
            Error: "Error!",
            RemoveEmptySpace: "Remove Empty Space at Bottom of Page",
            SavePdf: "Adobe PDF File...",
            MonthFebruary: "February",
            UserPasswordTooltip: "The password required to open the document.",
            SkipColumnHeadersTooltip: "Enable/disable the column headers.",
            DayThursday: "Thursday",
            OwnerPasswordTooltip: "The password to access operations with files.",
            PageOf: "of",
            OpenAfterExport: "Open After Export",
            ImageQuality: "Image Quality:",
            ExportFormTitle: "Export Settings",
            Reset: "Reset",
            ImageFormatMonochrome: "Monochrome",
            PasswordSaveReportTooltip: "The password required to open the document.",
            ExportPageBreaksTooltip: "Show the borders of the report pages on the Excel sheet.",
            BorderType: "Border Type",
            FindToolTip: "Find a text in the report.",
            SaveReportMdz: "Compressed Document File (.mdz)",
            BorderTypeSingle: "Unicode-Single",
            EncodingData: "Encoding:",
            MonthNovember: "November",
            Type: "Type:",
            AllowPrintDocumentTooltip: "Limited access to the print operation.",
            SaveOds: "OpenDocument Calc File...",
            ExportEachPageToSheet: "Export Each Page to Sheet",
            SavePpt2007: "Microsoft PowerPoint File...",
            ExportModeRtf: "Export Mode:",
            EditorToolTip: "Editor",
            ImageFormatForHtmlTooltip: "The image format in the finished file.",
            YearToDate: "Year To Date",
            ExportObjectFormatting: "Export Object Formatting",
            Parameters: "Parameters",
            AllowCopyTextAndGraphics: "Allow Copy Text and Graphics",
            FourthQuarter: "Fourth Quarter",
            GetCertificateFromCryptoUI: "Get Certificate from Crypto UI",
            SendEmailToolTip: "Send a report via Email.",
            ImageResolution: "Image Resolution:",
            EmailOptions: "Email Options",
            NewItem: "New Item",
            EmbeddedFonts: "Embedded Fonts",
            EmbeddedFontsTooltip: "Embed the font files into a PDF file.",
            Print: "Print",
            TiffCompressionScheme: "TIFF Compression Scheme:",
            DaySunday: "Sunday",
            CurrentYear: "Current Year",
            EncodingDataTooltip: "Encoding data file.",
            KillSpaceLinesTooltip: "Remove blank lines (rows) in the document.",
            ZoomHtmlTooltip: "The size (scale) of report pages and items after the export.",
            EmbeddedImageData: "Embedded Image Data",
            OnePage: "One Page",
            NextYear: "Next Year",
            PagesRange: "Page Range",
            ExportObjectFormattingTooltip: "Apply formatting to export data from Data bands (Table component, Hierachical band).",
            RangeFrom: "From",
            ZoomToolTip: "Zoom",
            MultipleFilesTooltip: "Each report page can be a separate file.",
            ThirdQuarter: "Third Quarter",
            SendEmail: "Send Email",
            EncodingDifFileTooltip: "Encoding data file.",
            BandsFilterAllBands: "All bands",
            EncodingDbfFileTooltip: "Encoding data file.",
            SkipColumnHeaders: "Skip Column Headers",
            ExportPageBreaks: "Export Page Breaks",
            PagesRangePagesTooltip: 'The page numbers to be processed. You can specify a single page, a list of pages (using a comma as the separator), as well as specify the range by setting the start page of the range separated by "-" and the end page of the range. For example: 1,3,5-12.',
            PrintPdf: "Print to PDF",
            MonthJune: "June",
            PagesRangeAllTooltip: "Processing of all report pages.",
            Message: "Message:",
            SelectAll: "Select All",
            ZoomXYTooltip: "The report size (scale): X - change the horizontal scale, Y - to change the vertical scale.",
            MatchWholeWord: "Match &Whole Word",
            Attachment: "Attachment:",
            PdfACompliance: "PDF/A Compliance",
            Tomorrow: "Tomorrow",
            ContinuousPages: "Continuous Pages",
            MonthSeptember: "September",
            MonochromeDitheringType: "Monochrome Dithering Type:",
            RemoveAll: "Remove All",
            PreviousYear: "Previous Year",
            SaveToolTip: "Save a report for further using.",
            ExportModeRtfFrame: "Frame"
        },
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        images: {
            "SaveHtml.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFCSURBVHjaYgzc/XQvAwODEwN5YB8D0ID/IAwC6DQMwPg7n3wFs0E0TJwJ2bh1LlJwdtCeZyg0CLhJc6HQIIBiALJibAAkD7IEWR0TA4WAEeQPikzYtm3bf3IBSC8LLoPvfPrJcOj5F4an334zSHGxMliLczNoCHBgqMMaBvc+/WLovbya4cjLpQz/gR5c+yCNoepMIcPp17eIM2DP088MNz7OYOBhVQTz+djUGO5/WcbQejEJQy1WLxx61cfACITC7IZgvhZ/PsPPv28Y7n1ezvDr3x8GNiYW/AZIckowPPryDej8/wyMjBAxPcFqBjbmDyiacXohWS2FQYBNi+HGp6lwMWZGDoYqvUXEhYGGACdDo+E0Bm6WD2C+ABszg6csH4O+MCdxYQAChiK8DHNtZxBMRyADdmzfvt2DzHS4AyDAABrkzDYw+OwxAAAAAElFTkSuQmCC",
            "SaveDocument.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACDSURBVHjaYuzq6trLwMDgxEACKC0tZQTR3d3dDAxAA/4TC2BqoTRILwMTAxkA6AKQ7f9BbBZkieUH7+DUFGmvwqCjrQ1xNgL8J8kL2LxEtAvQXQMDLLgkiAWjLiDgApCB2FxFsguQxdENJOgCQmFD0AWEwoURmBy3A2kPBvLADoAAAwDoGaQ5APlR2wAAAABJRU5ErkJggg==",
            "Windows7.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "SaveText.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACVSURBVHjaYuzq6trLwMDgxEAe2McANOA/CCMDGB+dRpaHYSaYUd3d3Sj0sWPHGEpLS8E0NnkYYMLlNisrK7BmEI0PMOGTPHr0KMFAYAT5g4ESsG3btv/o4Mf6Jf+JASC9LCBDHjx4iGKoJBYxXABsgIKCPIrgzwtHMMSwgevXrzGMumAwuIARmBi2A9keZKbDHQABBgABE7tHj/RgRQAAAABJRU5ErkJggg==",
            "SaveData.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEuSURBVHjaYry/1HAvAwODEwN5YB8LTLNC1DmGX++uM3y+sxaI1zEI6mcz8Gsng1U9WGYElocBEB8KnJiQjXu2I5pB2KwGzOaUtAIrBBmKrAlJMxiw4HIbm5Amiq24AIoLpDyWMrw91YLNqTgBIzAQ/zNQArZt2/afXADSizUMvj7YzvDxxhKGP1+eMTD8+83AwifPwKPozcCnHoWhFsOAf7+/MPz+/JCBkYmVgYmVk+H/H0gw/f3xDqsPsLrg59vrDEJGRQzsInpg/q/3Nxk+3VhKvAHfnx0GY5ArgATD/78/ga7hId4AGPgP9D9J6QAcr8zswFRoiWIjiM0uqk+cC0DO5pJxAAbmV4Y/315AFHFJMHBK2RDvBV7VUDAmBoAM2LF9+3YPMtPhDoAAAwDU/JvSfn23cwAAAABJRU5ErkJggg==",
            "ArrowUp.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAMAAACgjTZZAAADAFBMVEX///////+HiYmJiovw8fCAgYCLjIz09PTt7e3k5OR3d3eNjY729vbw8PHp6eng4ODY2Nlub26Ojo6Ki4uGhoeBgYF7fHx2dnZwcHFqa2tmZmYAbwBrAHIAXAByAEEAcgB3AG8AVQAuAHAAcABnAG4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAugCRAWAAAAMlAAAkAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAugAAACABYAC0A5EAGPUJOL4BOHeaALp3CTi5jlcAAHcAAAAAugCRAWgAAAMAAAAAAAAbAAAAAACYAAAAGPUJqwFbCHdQA5YAugFUEeQAAHZQALoAugEAAAAAAABQAAAAugEAAAIAAAJSAABSAAAAAEUAAAAAAAAAAAAAAAMAAABFAAAAAAAAAFIAAADvAAC/AFAAAEUAAABwAAADl4gAAAAAAAAAAAAAAAC6AXwAAABQAAAAugEAAAAAAABoAAADkQGWWwgAAANFAAAAAAAAAAAAAAAAAQAAAAAAAij1sADUAQEAGPRUEeT3DHbVABh3DXGps7P//gCa//93CTgJNJIAAHdoAAADkQEI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAB9///4DAIMBnwGfPgAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC6AAA0iAACoQoxAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAsSURBVHjaY2AAAiYGKGBmYYUw2Ng5OLlADG4eXj5+AUEGBiFhEVExcQlJKQAPUAFfavqkCgAAAABJRU5ErkJggg==",
            "Bookmarksempty.png": "data:image/png;base64,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",
            "SavePdf.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFfSURBVHjaYvxob7yXgYHBiYE8sI8FppnvwBmwyM8Fs8AYxP976zrD783rGX5tXgeXB4FPDiYwphMTsnEgCfaENDj/a1osA0dxFZwPMhhJMxigGACyBaQIF2CxssUUQ3cBMuCetZjhR28biovQASMwEP8zUAK2bdv2n1ywY9PG/3AvvHz5mqBl4uKiCM6/fwzqG1chwgBFkgjwY2IXg9CdGwxkueDnwtkMvzauQY0FYlzw/80rhu9dLQx/Th1DRKPK9g0M/zTVGV5z8uK09f+H9wy/d20D2/z/6xcGFgsbBlY3L4b9n74iovG/mATDPy1dhn/iUsAUxQ+J46ePGDjevWH4c+IIhC8ixsBZUgU2AAS2b9+O8ALjqxcMzCCM5oI/MKeaWTFwNnYwMHJy4U6JuABbYBgDR24JMOEzYSblZ6bWt6ROH1XDGmiMTAz3XbwYnqvpMjDs3IlNyQ6AAAMA+4a3P3zhm5cAAAAASUVORK5CYII=",
            "Office2007Silver.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "Default.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "Default.Loading.gif": "data:image/gif;base64,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",
            "PrintWithPreview.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALJJREFUeNpi/P//PwMyKCoqQhXABIx9fX1wDgs2FcgK0AzHEGNioBBQbABjYWFhGpAGYWMQ/7aAG8EwUP2wC6TmLBDPYoFqNEZWsLnOA6du36YdMCZITxrIBf8p8sJ/9HgkMvTh0YjkJDiIsldhOP9sN0NKSQuD2tOneA1nsdBRYKjyV8WQiACGaxu7I0M1NaIRlLBwJK6zlKQDeDSSHPBUTYnkuIABIze2bbxNdjoACDAAnPk0mb+5vDsAAAAASUVORK5CYII=",
            "SendEmail.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAD7SURBVHjaYvz//z8DLtDd3c0JpCYDMRsQZ5WWln5BV8OIywCgZhUgtdrExMSAiYmJ4dSpU3eA/AigIWcJGgDUHAKk5js6OvIADQCLXb58mWHHjh2/gMwaoCHdWA0AagQ5tV1dXb3IwMCAQU5ODsXgjx8/glzCcOHChR1AbhzQoNdwA4CaQapXGBsbW9rZ2TGwsLDgDJujR48yHDt27AXIEMauri7coQgFLs7OWMX37N3LALYG6BR8McFgaGSE3wAQWH7wDoaCSHsVDLEPeV5gWmDSNjDNgk8xMYBkF8BsxjCAbi7AaQBNXQCKSopcAEwnjHgNwGcDIQAQYABQWmVYCvm5cQAAAABJRU5ErkJggg==",
            "WindowsXP.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAEpJREFUeNpiNMo+ykAuYGKgAIxqpoXms1OsgIgczRBtxjnHiNKMbA8enUDAiDWFITsSl06czoZrwKMTCFhwSeDXNprChphmgAADAHiYFoh8fAnfAAAAAElFTkSuQmCC",
            "WindowsXP.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "Office2010Black.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "BookmarksfolderOpen.png": "data:image/png;base64,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////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ALLDDRIAAABlSURBVHjaXI85DsAgDAQHRMsXkpb/PyhSzg9EkcIlUrgI2N2O1/baXIxllcZxA74HLbD2jifAvKUK4nQATNJdEHC+RUDOciWXf4W3sEeVo3bSYzmiSppV9JaGCWzTv3gFjH7/GwAJKxnAgmMegQAAAABJRU5ErkJggg==",
            "Office2007Black.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "PrintPdf.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARNJREFUeNpi/P//PwMyKCoqQhXABIx9fX1wDgs2FcgK0AzHEGNioBBQbABjYWFhGpAGYWMQ/7aAG8EwUP2wC6TmLBDPYoFqBGGG7E2bgOQmRnQdynfuwNm+TTtgTJCeNMaWtdfx2lgdpIE18FBiAaQIBP6+fs3wrqeHQbSzE8xvXXeD9ED89eAB+bHALCrKwMTNTb4Bv27eZGBkZ2f4tGIFRsLCkbjOohjwbf9+BpGqKobf9+8zfD91ioHt22d8lsOjEQ6+nznD8OflSwYmfn6GLzt2MKi9AZofY4qRDjBiART6n5YtY+D182PgAWIYuAKMBX8CYQA24G1HBwOHoSGKZnwAIzfOtk6F8HDEO76EBBBgALdIW6xGfnkkAAAAAElFTkSuQmCC",
            "CloseFindPanel.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGhJREFUeNrUU0EKwDAIq/20PsFfO7w5SYTR7TChUEyaNoZKRKyT2uuw3hcwM+oJYRsREJFhNwF3F3Rb3VdOlqAUmI1+mA4REVHvuxinIT6KMZ/NBjvG2D2PIplCXaoavTdh8v/PdAkwACKzahvWdxXGAAAAAElFTkSuQmCC",
            "CollapsingPlus.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAADAFBMVEXJycHFw7u/wbm7u7W1ta2vraenp5+foZmZmZPv7+7u7u3u7ezt7ezu7uyRkYvFxb3s7Ovr6+rq6+mJi4PBwbno6ejn5+bo6Ofp6ejp6uiBgXu9u7N5eXO3ta/q6urm5uVvb2uxr6ns6+rj4+Lk5OPl5eRnZ2Opq6Pi4uFfX1mjo53l5uXg4N/h4eBVVVGdm5WVk42LjYeFg397e3VzcW1paWNfX1tNTUkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUJqwH1kHcBABgAAABUEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACoAOgDhEgAAAD1sAALABgAjAAAA5YSKAAAdlR2UCobACAfmAABA4QAAACESKD11AMjABh3COAI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAAE//+rtAG0BnUGdasAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAADoAABbUAAAB0nTNs/UAAAAAWJLR0T/pQfyxQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAGpJREFUeNolytsaQkAYRuFP6Lc3I5lpYzuKiPa5/zvjqXX0HiwA2ko3zDVZgO24nuc6foCQ8YiIc7ZBvE0SIiF3exwk/RJHpNmfeYGykjmRqk9nNEwub6vUBR0XvboOQzvidn88X+/Pd5xmRQgIsvQGdUsAAAAASUVORK5CYII=",
            "BookmarksjoinBottom.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA+SURBVHjaYvj//z8DLtzQ0PAfnzwyZvz//z8DNQATPsnGxkaibRl10WBzETE0fVw0atCoQUQCAAAAAP//AwC/4Frt21yE6gAAAABJRU5ErkJggg==",
            "ArrowLeft.png": "data:image/png;base64,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",
            "AboutInfo.png": "data:image/png;base64,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",
            "HelpIcon.png": "data:image/png;base64,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",
            "MsgFormInfo.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI3SURBVHjaxJddKARRFMd3B1uKiJSkrZWQ8vGgfSJFHtja8qAtosQjxbuPePSmeFGilBSRWKSoLSUbSUr5qH3ypHxEbWFb/7udy1hm594xdk792mm6O+c/55x77hl7y/C6zUpLFVyXBzqBG1SA8l/WXIBzEAQL4M4MAU2gB7QCh87acsIHJoAfzNCvpika9/PBNtilBzokI5sCvGATHGlETDMCpeTYmchDlSvb1ucpiV1P+a9sZ6FHraUsbcegC6zoRSCH3typ94rMeUFOeoxBb5ne8nSwBBr0BMwBl1CMFfvXQxThtKyCYi0B7ZQ3IZveurY9vLzGmNy4Ev1bFlgmMTGzq/rAKahO0vbvoq36WYRNMs79I/U/7nnGAzICxsAiiCgqAcLGnHGH7/ZMIxFgdVarroEGw600+vx57UhLkfmrTy2g1IzEvr1HZJa7uQBWmRlmCIhGpZZXcAGvFh2EL3wXhMETRcJAEWQZFRBS18C5BREIqgUELBBwoBawkGTnYT4ncAGXYC2JAuap7r6dBS4aHvKMtGKJlsyqn53ft/EDCavKZrCntyMk+3689XPnv80DJyQi9E+hH6XwJ5wJD0ElmKRiMcNuQBsYFx1KWZ4GQCGFbIcXjYRFaKt1U85XZKZibvds5qS0ZINc0Ei7RsuGQBHVVx2FPCI7licStA9qaKDQarHCNaQYzClLUQfo/WudKH8srlmKxqVVAvg3YU389jL741QkJd10qIWtEKDu8VL2IcAACNZ58Bjd0bIAAAAASUVORK5CYII=",
            "Bookmarksnode.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB5SURBVHjaYvz//z8DJYAFxiguLiZkUmNvb28DhijIBSBcVFT0HxcAyTU0NIDoBph6GGYi1qn19fUMfHx89UCXNmD1Agxs2bIFhe/j4wPzItwsIG4gyQvo3kH2AkEXYHMNXi9gU0RUNI66YLC4ACm1EQ0YKc3OAAEGACk8j7f3gD1uAAAAAElFTkSuQmCC",
            "Office2007Black.Loading.gif": "data:image/gif;base64,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",
            "Bookmarksfolder.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMAUExURf//////zP//mf//Zv//M///AP/M///MzP/Mmf/MZv/MM//MAP+Z//+ZzP+Zmf+ZZv+ZM/+ZAP9m//9mzP9mmf9mZv9mM/9mAP8z//8zzP8zmf8zZv8zM/8zAP8A//8AzP8Amf8AZv8AM/8AAMz//8z/zMz/mcz/Zsz/M8z/AMzM/8zMzMzMmczMZszMM8zMAMyZ/8yZzMyZmcyZZsyZM8yZAMxm/8xmzMxmmcxmZsxmM8xmAMwz/8wzzMwzmcwzZswzM8wzAMwA/8wAzMwAmcwAZswAM8wAAJn//5n/zJn/mZn/Zpn/M5n/AJnM/5nMzJnMmZnMZpnMM5nMAJmZ/5mZzJmZmZmZZpmZM5mZAJlm/5lmzJlmmZlmZplmM5lmAJkz/5kzzJkzmZkzZpkzM5kzAJkA/5kAzJkAmZkAZpkAM5kAAGb//2b/zGb/mWb/Zmb/M2b/AGbM/2bMzGbMmWbMZmbMM2bMAGaZ/2aZzGaZmWaZZmaZM2aZAGZm/2ZmzGZmmWZmZmZmM2ZmAGYz/2YzzGYzmWYzZmYzM2YzAGYA/2YAzGYAmWYAZmYAM2YAADP//zP/zDP/mTP/ZjP/MzP/ADPM/zPMzDPMmTPMZjPMMzPMADOZ/zOZzDOZmTOZZjOZMzOZADNm/zNmzDNmmTNmZjNmMzNmADMz/zMzzDMzmTMzZjMzMzMzADMA/zMAzDMAmTMAZjMAMzMAAAD//wD/zAD/mQD/ZgD/MwD/AADM/wDMzADMmQDMZgDMMwDMAACZ/wCZzACZmQCZZgCZMwCZAABm/wBmzABmmQBmZgBmMwBmAAAz/wAzzAAzmQAzZgAzMwAzAAAA/wAAzAAAmQAAZgAAMwAAANqrYdutZOG1b+K2cee+fOrCgtusY96waf///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHpOG+kAAADhdFJOU///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AFYmD64AAABESURBVHjaYnzAgAqY0PgMLAw/GBgYOJAFWBgZ/iKr+MfIwMD8+99/KJ+DBWISE9xIDEPpI8DyC5XPwcKBpoIR3fuAAQAswAj/CTKo6wAAAABJRU5ErkJggg==",
            "BookmarksminusBottom.png": "data:image/png;base64,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",
            "ArrowUpBlue.png": "data:image/png;base64,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",
            "Office2007Silver.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "FirstPage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABdSURBVHjaYvz//z8DJYCJgUKAYoBv047/MIxNMTZxol2Ay1AmSjQTZQA+zQQNIKQZrwHEaMZrwOY6D0aK0wExhhAMREKGEBWN+AwhOiHhMoSkvIDNEMYBz40AAQYAaKwlq7Pf/SYAAAAASUVORK5CYII=",
            "Office2003.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "Office2010Black.Loading.gif": "data:image/gif;base64,R0lGODlhEAAQAOZZAJKSkoCAgO3t7ezs7N3d3fj4+PHx8dvb2+fn5/r6+vT09L29veLi4srKyvn5+fv7+5ycnPz8/PLy8tfX17m5udTU1K2traioqP39/YaGhuTk5PDw8PPz85eXl9XV1aysrLi4uM3NzeHh4Y2Njbq6uvb29u/v74yMjNHR0Z2dnebm5tra2vX19cbGxurq6szMzN7e3sjIyKWlpcnJycvLy4eHh6mpqZiYmJWVlYSEhODg4Kenp6qqqrCwsLu7u4GBgb6+vujo6JOTk+np6dzc3J+fn7Kyst/f37e3t7S0tO7u7r+/v8HBwff39+Xl5bGxsZ6enuPj48fHx6SkpLa2ttnZ2f7+/uvr6////////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFCgBZACwAAAAAEAAQAAAHmIBYgoMoGTUTg4lYVi4GVjUBASOKglYWAEJVGZEnlFguAKE8HicjBJ4KHaE+nooMRkwJrYIwOxcMrQUDAw42U1MWrQNXVwIXvx/CxAIiHxYIuQICslgqLSgPiRgIIhKDClThFYlDVeYOggLhVDRXMw0CGuZVJZUxVCADDVJSISwrVRhYGWTFQAEs+6S8wPLgYCsBL0JsoBQIACH5BAUKAFkALAAAAAAQABAAAAeggFiCgxMdNwSDiVhWAgpWNwAAKVgmKlaDViRTMkcdkRAVPwFFl1hKU6ggBxApDBABsAiCJReoLYk9sBkSgwhANA+JDkhTiFgaIBRBisxYJFRUC82KFNDS070LC1fYigMVRBGJVhwmBYNNMVJSMIkcV/DiWAbrUhMGKwccBvBXCYMepMwwcKBKFQIJBlzZoEiBAywFD2LBEGyaBAIEWDALBAAh+QQFCgBZACwAAAAAEAAQAAAHmoBYgoMwFzYMg4lYVgYlVjZTUxZYBi5Wg1YxVFROF5EfK0IAFpeUm1QtIh8WCDwAry6CBRSbKIk+rx0Kg1c0HhGJCUxPiFhXMw0CioMoORkTDVJSIcuLNQEBI9FSL9VWGdgnAi8hG9VYHicjBIISIggY54MOVfVD8oIl9VUaBQMDDs4xqLKCxYArV5SdK/AAy8GE+GQJEJBgWSAAIfkEBQoAWQAsAAAAABAAEAAAB6CAWIKDGhQkQYOJggoFViRUVAtYCgJWiR5SMVcUkAs6MlMklpNSpRUICwtXIFOtSoIODaVEiS2tFyWDGxNHEYkPNEAIggYrBxyKgxM4HQQHVVUEyVhWNwAAKc/R01Yd1xASBAQs01gHECkMggUmHKPrPRAVgxFX9siDSQEBPwOCCfauGEgkY18AHbquDEiQCEaOAFB8DXqAIZkEFe/KTQsEACH5BAUKAFkALAAAAAAQABAAAAebgFiCg1cNDQKDiYIFCVgNUlIhWCUGVokMVVUSj1IvKlRUMZZYBZlVIgIvIRstoFQGgg8HmQiJKKAUBYMsGi4YiREeNFeLAwMOioMwOxcMA1dXiMlWNlNTFs/RyVhWF9YfBQICjdsiHxa124IOPjwr6olLAABCJtsoORkTRvMAGtM1AgQYEQUHgA8RpmUQeAKLAhejknk4MYJAskAAIfkEBQoAWQAsAAAAABAAEAAAB6OAWIKDBgcHHIOJgg8RWAdVVQRYBQqKG1dXBY+RAzFSHoMPmFcmEgQELBVSq5VYGAOYiINEqw0OgwkGClaJEUcTG4rCgxogFEHDiVYkVFQLyYNWFM3P0IIICwtXghUQPQWJCS0gOoMDPwEBSYkzU1MyBoI66QEyEzgdBEDuU0OCVkUC5CBwAwCAFAh2TKGAIZoKCVY6GISApYQAXsMOQEjBQFggACH5BAUKAFkALAAAAAAQABAAAAeZgFiCgwUDAw6DiYoDV1cCWAkFiomMjhJVVQyTggUCAgkimFWSm4MImAcPpYMYLhosgig5GROlVzMNAjUBASOlDVJSIRm8J7/BLx4nIwSlAi8hG4IrPD6Igw8oLSqDJkIAAEuJFVTlCoIa4ABGMDsXDDTlVI9YVhYAOAw2U1MWAyBUpGAYZMWFAisX+H3AUsCAlVIiPlhAMCkQACH5BAUKAFkALAAAAAAQABAAAAehgFiCg4SFg1YqJoYRD4RWRQE/FYQFV1cbgwgBmxCEJpZXjVgSGZs9hByWAxiDBDJIDo4KBgmCEzgdBIaCBisHHDcAACm7WAdVVQQdwp27x8kHECkMxRIEBCyCOiAttYMRRBUDgwYyU1MzhDBSUjFNgkPnU0AaIBRBE+xSBoJWJFM7VJCgQmWBgRlSKlg5JKCEFQoEF2BxoKAYFgQLFlwxFAgAOw==",
            "Office2007Blue.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "CollapsingMinus.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAADAFBMVEXJycHFw7u/wbm7u7W1ta2vraenp5+foZmZmZPv7+7u7u3u7ezt7ezu7uyRkYvFxb3s7Ovr6+rq6+nq6unp6uiJi4PBwbno6ejn5+bm5uXo6Ofp6eiBgXu9u7N5eXO3ta/q6upvb2uxr6ns6+rk5OPi4uHj4+Ll5eRnZ2Opq6Ph4eBfX1mjo53l5uXg4N9VVVGdm5WVk42LjYeFg397e3VzcW1paWNfX1tNTUkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUJqwH1kHcBABgAAABUEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOgDhCQAAAD1sAAMABgFIQAAAUcSKAAAdlR2UCobACAfmAABA4QAAACEI/j11AMjABh3COAI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAB1//84iAaIBnIGcjgAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAADoAAD6eAAAA40cBS2ZAAAAAWJLR0T/pQfyxQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAGpJREFUeNolxlcSgjAABcAnIF1MFDBFwJJEDSh2vf/JmIH9WgAzx/XmfhACUZykaRIvMiwJXa1zSkmBcsMY50LmW1QyGIkazW4q3+NwlFxpo05nXIhkympjWnRUXM3NWt3j/ni+3p/vr/8Pb64JoOz29nAAAAAASUVORK5CYII=",
            "Office2007Black.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNqslb1OwzAQgC/RDR4YbmDI0KESGyzpG1SCgfeAR2JF4hEYGUDqiFiaBQZUJAaGDB08dLghUjjbSePUCSlNT3F8558v5/PFjsqyhK/lfQlHkLPZTRSt3u5KShKgyfUomP55Ap3ngLxhB9ssvG4lhf9hgzDmkK8eBFhIR12s8M4kU+se25PCVVgr7a/v6n01tJxgZvGQ2TVwLuVbxk4PC+IJO6D10MD0Y/Wx7EBgalyEuIndfoLnz7aEImFAJcDWRgzDbPw/rjp63cbG+3ryN6yRXg/riT54COaAWKcAeTUFgBBG4ZKFhY1BLjmxGlzpxeetvLRrt23k2dTYLqvlQX+jkuaP6dIRQtuukLZh85YM0EqhLh0ptP1x2yXjazN4MHeo2zYMCUmsDJLT8YdhIQylzGljYpK5uIwRzKq9naSg1wrodDHugF3PgaYMkbkC3pcvR7kCLmaX0a8AAwDOipVbk6mXKwAAAABJRU5ErkJggg==",
            "Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABdSURBVHjaYvz//z9DY2PjfwYiQX19PSMyn4mBQgAzgBENo9uIVY6qLhjCBrCQqP4/MMrBAQuLelINYARqBqcbWHoYjQUqGMAAyo2k4oaGhv8wNknRCIt75HQAEGAAd+tKehdJM0YAAAAASUVORK5CYII=",
            "Bookmarksroot.png": "data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AzF4BsAAAAGJJREFUeNqUjkEKgDAMBCch6jeqov9/j0KpfYSXCnqwaHsSh73sMpBI3DvhQTGsf3sA4whuzX26HUeJcoRqMBrHVBlpw/scQGIaiyuKkpafhiEzAzmAcn4Yxrm05acSqbkGAGenLiT/9JfeAAAAAElFTkSuQmCC",
            "ZoomPageWidth.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+Kioq49hj///+mwNtNgrgY81hiEAACdNkAAAAAAADzlACUABh02dAAAAAACAAAAAAAAAAAAFAACABgAAp3H6gY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABvAFoAbwBQAG0AYQBlAGcAVwBkAGkAdAAuAGgAcABnAG4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUfqwH1kHcBABgAAACTEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABIALUAukMAAAD1sAAMABgC+QAABKsSKAAAdpN2jyobACAvyAABALoAAAC6Q0D11AAjABh3HuAe36UAAHcAAAAAAAAAAAD2WABGABh2kMYY9ljGoAAAdpAAAAA///9XCAIIBdwF3FcAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC1AAD+wAD3WKoHAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAJcEhZcwAALiMAAC4jAXilP3YAAAA4SURBVHjaY2BEBQwMjMzIAJcACwTgVsEKVcEKFWBlhUoDGSABVla4ClZWrCowzSDHHWgC6L5FBwBoOQJ7wAJr3QAAAABJRU5ErkJggg==",
            "ArrowDownBlue.png": "data:image/png;base64,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",
            "Design.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+AgIC49hhNgrj////AwMDnjkZiEAACdesAAAAAAADzlACUABh169AAAAAACAAAAAAAAAAAADoACABgAAp28KgY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIARABzAGUAaQBuAGcALgBuAHAAZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPXwqwH1kHYBABgAAABwEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQADAANToAAAD1sAAKABgDgwAABTYSKAAAdnB2bCobACAiQAABADUAAAA1Ogj11AAjABh27+Dv36UAAHYAAAAAAAAAAAD2WABGABh2bcYY9ljGoAAAdm0AAAAA//9DEAYQAm8Cb0MAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAAwAAB7SABTW8N7AAAAAXRSTlMAQObYZgAAAAFiS0dEAxEMTPIAAAAJcEhZcwAALiMAAC4jAXilP3YAAABQSURBVHjabc5LDgAhCANQmxbvf+SRTwiawbjgidWFNYpnYwhJhxbRBS2kaiLFj5UZIYz5CgWs+3zF1H1kWOVNoOwB6//suw7oWg6z9s+Vpz7MJAIcoKu7VQAAAABJRU5ErkJggg==",
            "SaveXps.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFOSURBVHjapFLLTsJQFJxbUSRl0ZIYA42PpXFhTNAPgETjgh9hp1+iK90bv6ElUVkbhZW6cAEJwRSKRo1Ca21L7a25WBosBCdp5txzOnOnJyXLx5VLAHlMhzLHxI1iFmGmz8F2xj9TZr0A8hyrjiotf0iZYeWkiv2ttF9TpjPaC2JgwF5gApaCGTJhKAFiwcPhjTpkELyNCYMJKYi3RBf/gSzL7rSgWm7cBXbfxbXaxV1HHzmPRQnvnwycP/bw/NnH7hI/mYHlCW894VVLR6Pr4OHdwroYh2a60QZUWHszcdHU0TEctHUbVe0DWUlE+4tAMEYbDHbAEYK11DyKGyn0nD7KNQ0ZIYkXm0CzCJrGmAQz5JcLq0nUXwWc7aSR8BqyauK0bky+xJzEY3MhAT7241qQ4l7NRX9CGOLc8Ci3OPtngpKiKHtT/oelbwEGAGxRw6UIK4iWAAAAAElFTkSuQmCC",
            "Default.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "SaveRtf.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADjSURBVHjaYgybdX0vAwODEwN5YB8LTPPKVA2wyJpzbxhWn30D54NA+OwbGHwocGJCNg4kEWIkgqIISTHYcGQ+CKAYALIFpAgXMJLjwRDD6QJsoHL9AwwxRmAg/megBGzbtu0/uQCklwVm0MuXr0myWFxcFEyzoAuQCgi6ANngH71tDH9vXmfgnrUY0wBCLvj37CkQP2H4/+UTeS740dvKwBaVwPBz5mSwYUxS0sS74M/ZU3AMAn9vXcc0AJ8LQLbzLNsI1vRz2UKwC0gKA5BmGGCPiscIgx3bt2/3IDMd7gAIMABd0qBRIGJjOgAAAABJRU5ErkJggg==",
            "FullScreen.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVHjaYvz//z8DJYClu7ubbBNKS0sZWaAMkjUDLYa4ACaQs/gW0ZqnxKrB2UwMFAIWdIFWPzUUfvWmW6QZQEgDyS4gZPgwcAH1ohE5cZBsACxZkgMYKc2NFIcBQIABAGIsIfw8AuswAAAAAElFTkSuQmCC",
            "Parameters.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+49hiKior////Q3uxZir1NgriUtNSsxd7n7vbb5vGIrNBxm8agvNkAAAAACAAAAAAAAAAAAEoACABgAAp28KgY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABhAFAAcgBtAGEAZQBlAHQAcgAuAHMAcABnAG4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPXwqwH1kHYBABgAAABwEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABYACQAKIoAAAD1sAAXABgBWwAABPUSKAAAdnB2bCobACB9UAABACgAAAAoilD11AAjABh27+Dv36UAAHYAAAAAAAAAAAD2WABGABh2bcYY9ljGoAAAdm0AAAAU//841AbUBhMGEzgAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAAkAAA2OABkQTPwAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAJcEhZcwAALiMAAC4jAXilP3YAAABESURBVHjaY2CAACYmBhTABEZwSQSACDDDuMwwATjAI8DCysaOIsDBwsnKiaqFixvVDC4eNEN5OQjYwszBTkgFigCK5wD9yAIeIKOH+wAAAABJRU5ErkJggg==",
            "SaveOds.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGESURBVHjaYuxYr7eXgYHBiYE8sI/ZJUJ8IYhloBDCEO+wnOHrjzcMLz5cYygPuMigImHPwAiEIL6NRiZDpM1cMP/RmzMwAxSZYCx3g1qGzg36YBoGFh6IhPOtNTLA8kduTEdxAhMDhQBuwM4LzWBng2gYAHkJxj96YwZYHuQVZMAIDMT/FDlh27Zt/8kFIL0s2Ay9ef8ww/PXtxikxTQZVBWsiAsDZKAqb8UgLqzMsGRTIcPC9Tl4DcDqAiYmZgZNZQeGqoy9DJW9+gyVffoMwgKyDEoyJgyu1jkMvNwimAY8fX2R4fCFKQxPXp1jkBEzYvCyamLg45ZkiPbrZ2Bj5WAQFVRg+PjlJcPuo1MYgtwacAfip68v/8/ZGPi/db76/9uP9///8u0NaYHIyyXGEO2xgKFvmRnD/M2hYDFhfkUGJWlbBlezKgZuTmHCYcDBxsfgCfQCN4cIg7SoPlgM5LWD5yeCvUbQABAwVAtD4avLu4IxtljYsX37dg8y0+EOgAADACOF3MeMIgy6AAAAAElFTkSuQmCC",
            "Save.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABuSURBVHjaYvz//z8DJYAFxuiMXP2fIgNgoHx5KFEagRaCaSYGCsFwNGD7zDMMoKiFYXQAEgOpwRkLlw7cB2O6eYEFm2DZshA4m5GREcMLXVFraOwCGIDZhOwiqocBIyyqgGm7AUjVk20AuQAgwADdIi9FIVmdsQAAAABJRU5ErkJggg==",
            "Office2007Blue.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "ZoomOnePage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEX///+Kioq49hj///9NgrimwNsY81hiEAACdNkAAAAAAADzlACUABh02dAAAAAACAAAAAAAAAAAAEwACABgAAp3H6gY9jDzZABEABgAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABvAFoAbwBPAG0AbgBQAGUAYQBlAGcALgBuAHAAZwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUfqwH1kHcBABgAAACTEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAK4As6wAAAD1sAAWABgB5QAABJ4SKAAAdpN2jyobACCf6AABALMAAACzrOj11AAjABh3HuAe36UAAHcAAAAAAAAAAAD2WABGABh2kMYY9ljGoAAAdpAAAADo///TAAUAAjcCN9MAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAACuAAAv6AAnMJIqAAAAAXRSTlMAQObYZgAAAAFiS0dEAmYLfGQAAAAJcEhZcwAALiMAAC4jAXilP3YAAAA0SURBVHjaY2BEBQwMjMxgwAKh4AIsLCwoAiwsUBGEFmZkLawwQFMV2NyB7lIUv6D7Fh0AAGjKAnyhnaeFAAAAAElFTkSuQmCC",
            "Office2010Silver.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB6SURBVHjazJLNDcAgCIWBdFM3wDkYwVlpPNggEWvroX2JByF5H3+oqrCjw35yzpebiOBdvIq8Y0ppSIri2FqwFEuL4sMKIsosT5ZeSoFoJpFolW4B1piers2DkJlfH0IdJkXl12R7syoINvUTA7//1XV2p/xZC6cAAwCC4Dm3f4iZSAAAAABJRU5ErkJggg==",
            "Bookmarksminus.png": "data:image/png;base64,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",
            "Bookmarksjoin.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAA8SURBVHjaYvj//z8DLtzQ0PAfnzwyZvz//z8DNQATPsnGxkaibRl10WBzETH0aKyNumhQuQgAAAD//wMAX81w5fDFiVcAAAAASUVORK5CYII=",
            "WindowsXP.Loading.gif": "data:image/gif;base64,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",
            "PrintWithoutPreview.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC2SURBVHjaYiwqKmJAA/8Z8ANGZA4LNhW9vb1YdRYXF2OIMTFQCCg2gBEYBvZAuguIzUBO92veiVfDplp3mFdOAXEZKAxWALEEsgIigRlIL8gF/6keBiCv4IoJogOxfMUMogxhwRfvMEOwxT9yLDxhMVWVxmdLZ0QGroT0FOSFFELOBLkEC3gB0gsyYAchA2AugHqXEZofJEF6WaAKGNEzE8xWZM1ExQKyP7FpRg8HRkqzM0CAAQBaqzs4D+6nowAAAABJRU5ErkJggg==",
            "SaveImage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFrSURBVHjaYnyat2svAwODEwN5YB8TTLPURFcGGC0Qrglmg2iYOJeVDINoiTmcDwVOLNiMBSn+sPI6mIYBkGHP8ndjqGXCZgBIIcgmbBrQXIDdAGwA5CKQF9ABIzAQ/zNQArZt2/afXADSi+KFf7/+MtzfeIHh88O3DB9uvmQ4lLuC4eH2K3D5+5suMuxLWQSmsYbB6/OPGB5uu8JwffZhsEHcItwMH26/gsuz733FoOinz/B5+13sBgjrSTPwyAoyCCqKMAgpiTKw8nAwqEWYwuV/OouBbef1VIaLoaSDu2vPMzAxMkIMM5Fn+PL0PcPFvt0MwgayDKpAg0C2gzDOaHxx/C7D1xcfGX58/sHwBOh3Zj4Ohl9ffjK8vfIUZySguMCwxI3h99efDO+uPGN4e+ExgwrI1gBDBiYWJuIM4AP6HQS+v/rM8Pv7bwZ2QS4wxgew5gUZJw0wJgaADNixfft2DzLT4Q6AAAMAm/m3eTi1TEwAAAAASUVORK5CYII=",
            "Bookmarks.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABmSURBVHjaYvz//z8DJYAFRBQXF5NsSm9vLyPcAKgA0ZqBFsLZTAwUAhZ0Ab/mnQw14UYMLSvPYSjeVOtO2ACYImyKiXIBIZegG4zTAGJdMghdQPdYoF5CQk6epABGSnMjxV4ACDAAoZcyOOj0dmgAAAAASUVORK5CYII=",
            "Office2010.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "DateTimeButton.png": "data:image/png;base64,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////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AEo/IKkAAACNSURBVHjaZI7BCoQwDESn1bhru4LQ//9EhYpC2mqyB6vgbm7zeBPGbHheCxxyJ9ugBWRcgQyZhUIDi/8K8MG0IFsagNNYZy1FRy2XkWMxCOrYn2CSIgHRCVVjKSYoHHuuP7KMcd/Fp64CG9QxE3epVmx04pFe/bsaQ8/KTKxKgNkgx7WSrmE/0+0DfgcAPbo9DqZGpIwAAAAASUVORK5CYII=",
            "About.png": "data:image/png;base64,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",
            "Windows7.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "SaveWord2007.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEZSURBVHjaYgybdX0vAwODEwN5YB+ztm/OQhBrZaoGg7E8DwMjkH3vzQ+GUGMRhnofOQZGoMC1598w+FCgyIRsXOX6BwypthJgdoiRCEP47BtgGpm/+uwbFCcwMVAIUAxoD1RgmH34BZi95twbsLdANDIf5BVkwAgMxP8UOWHbtm3/yQUgvSwwg16+fE2SxeLiomCaBV2AVEDQBSCDX37+zSDOywqmediYGLjZmcFsol2Qt+IuOAZatz5icNYUAIu9+vSbQYZYF4DAnhsf4LZuvPgOHOXnjhDpAl1pboZlp16D6ctPvzFYKvKCvcRAiguURDiABnCBDUqNUMYMRHwuAOUPUODBXAOzHZwSgYlhO5D2IDMd7gAIMADVqqMLRV88lAAAAABJRU5ErkJggg==",
            "Print.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACtSURBVHjaYiwqKmJAA/8Z8ANGZA4LNhW9vb1YdRYXF2OIMTFQCCg2AOQFeyDuAmIzkNP9mneCMVYg4Mawqdb9P9Qrp4C4DGTACiCWgKkBKiDWcjOQXhZkzdgCiQCQGPhApEosPAViaTIT0lOQASlAPB85MEHAt2kHisrNdR7oml+A9IIMAKmUhNkMtOU/Dg0w1zEiu4QFl9+IcAGmAcgm49KAHg4sxOY6XAAgwABqSjFfY2wW+AAAAABJRU5ErkJggg==",
            "Windows7.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAV5JREFUeNqslMFOwkAQhv9Z14YoIkpjYtAD0Yvx4hv47LyBB416wBiEGEGCgkbpth131hZMKR5aJtnubrv79Z9/pyVmxl13xL2XMcrEoV/Hecsnun4YslZAq7lfGKYUofM0Qhjb8fPwDSfHDZBShZtN0jGEpSM7U0QIIi6VsmdVCktDOGkrEwlDO2G0BiIBwtJigHgQx+WAzCQX6Di5keXxihfUtjddP/0Kl54Jyyn8D5AHm3ya/PVOIbse2UPeqy42Z2ES2fXONudhchxZD2WjQFLQXxhy1qczPZsZGFvig0mwlMFt7wNnR9X5uD+erbSj4ikIS8/lrvDwpjvNVZRj36/CRQox1hGJQkZUug45BZKtH8Z3YArDxI6It9znMvfQRLyelLXegAlC+DWvuEIRZBnC0n59B53+GKf2f2aiYmlXPA/3j68QFomZ7as+D0bvpVI9aOzi8qJJPwIMALe9x88ZfvvHAAAAAElFTkSuQmCC",
            "Office2007Blue.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNqslb1OwzAQgC/RDR4YbmDI0KESGyzpG1SCgfeAR2JF4hEYGUDqiFiaBQZUJAaGDB08dLghUjjbSePUCSlNT3F8558v5/PFjsqyhK/lfQlHkLPZTRSt3u5KShKgyfUomP55Ap3ngLxhB9ssvG4lhf9hgzDmkK8eBFhIR12s8M4kU+se25PCVVgr7a/v6n01tJxgZvGQ2TVwLuVbxk4PC+IJO6D10MD0Y/Wx7EBgalyEuIndfoLnz7aEImFAJcDWRgzDbPw/rjp63cbG+3ryN6yRXg/riT54COaAWKcAeTUFgBBG4ZKFhY1BLjmxGlzpxeetvLRrt23k2dTYLqvlQX+jkuaP6dIRQtuukLZh85YM0EqhLh0ptP1x2yXjazN4MHeo2zYMCUmsDJLT8YdhIQylzGljYpK5uIwRzKq9naSg1wrodDHugF3PgaYMkbkC3pcvR7kCLmaX0a8AAwDOipVbk6mXKwAAAABJRU5ErkJggg==",
            "Bookmarksplus.png": "data:image/png;base64,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",
            "PrevPage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABaSURBVHjaYvz//z8DJYCRUgMYQAYQg30at//HJs5EjCW+TTtwOpOJEs0EDSCkGa8BxGjGaQCxmnEasLnOg5EiA0gxBG8gEmMIwWgkaAilKZFxwDMTxQYABBgAlEaAOxX1tRYAAAAASUVORK5CYII=",
            "BookmarksplusBottom.png": "data:image/png;base64,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",
            "CloseForm.png": "data:image/png;base64,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",
            "ButtonArrowDown.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAMCAMAAACHgmeRAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAEZ0FNQQAAsY58+1GTAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAMAUExURQAAAP///3d3d////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGtQtZwAAAAEdFJOU////wBAKqn0AAAAK0lEQVR42ozMsQ0AIBDDwMvD/itD8VBDKku2kuGs/NFkQRRB2kZul/fLHgBL7wEimuzAnQAAAABJRU5ErkJggg==",
            "ViewMode.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFaSURBVHjalFMxa4NAGH2murhkzFCiP6A4BoLQsTgEusYx0J8Q8iOMZA+lnVw6dQiIhW6aNSZQFAyECqZkzipJ2u+kDqH1bD94vLvv3ffu07sTxuPxJzgxGo0Eng5mUBVM+9ZRhQZqgjqAbduVXdYaUHHJv5qIdbvXRaXB6XRCEAQIwxC73Q7tdhtpmt5NJpPH2k84Ho+YTqeYzWbYbrfFnIqZ9DAcDp9qDXzfx2azQavVwmAwgGVZME0TsiwzuU8mfa7BcrksuNfrQdM0iKKITqcDwzDKJXyD/X5fsKqqZ3lFUcrhJdeg2WwWnCTJWX69XpfDD66BrusFu66L1WqFw+GA+XwOz/PKJffcY+x2u4jjGFEUwXGcH4dEyMuJUPWY2CViuy4WC2RZBkmSkOf5K0k37DcRrulOvAnsQfw16PguiJ4Jt4SYDK4a+EdQAWvfJLwQ3lnuS4ABAMfktPVY3F2lAAAAAElFTkSuQmCC",
            "SaveExcel.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADQSURBVHjaYuxYr7eXgYHBiYE8sI8JpjnBcg8DNhoGDGTjwGJo4k4sMNaFJ4vAkiAaGzCQiQPLXXiMKs+ErgBEYwMLjrtgdRkTMgfddGQng2iYJciAERiI/xkoACx67B0M1tY2WCXfvXvHoKAgD+e/fPmaQVxcFM7fvn07qhfIcgGI4HnZj1WSB4gfPIhHEXvw4CGmAUzswlgN+PfzLV4vXL9+jUpeANmEC6A7GasXvogXkhUL1PPC9+8/cCoA2YqPDzJgx7lzZzzIdMAOgAADAKPbYKCcZy3ZAAAAAElFTkSuQmCC",
            "Bookmarksline.png": "data:image/png;base64,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",
            "Office2010Silver.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ5JREFUeNpi/P//P8Plrc3/P1xbx0AJENAKYtD1rmVkubyt5f+H6+sZbKNdKTLw8LL1DJcZGf8zHuox+m8b7shADXB45X4GFgZGRgaGv/+pYiDILIiB/6lqIBMDw79/VDKQiRYuZAK5EIuBOCxhVJ8Ckb6ViynJRKIL4YbdzMGuBx6G2OQ0kDSjGwZm4ApDJkassiCNIENgBqEYhstEoFlMYBfiAMgGoBqGL5aZcBgIDaP/N7LxRhL2SAFhqiYbNmYQj0LT/kNcyMjGzsDAzEwV80BmsYA5zExUMRAEIGHIwkS1MGTilnVjOLrnBsTbFGCQGSCzGEFVwPmDk/9/ebKbIsfxyLgyGNrnMgIEGABSj14mjAo5NQAAAABJRU5ErkJggg==",
            "Zoom.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFrSURBVHjaYvz//z8DJYAFmVNcXKwIpEqB2BuI5YD4KRDvAOLu3t7em9gMYIS5AKjZA0itBmIeXl5eBkFBQYbPnz8zvH//HiT9C4jjgIasxGoAULMEkH2VnZ1dKCQkhMHIyAiu4MaNGwwrVqwAGfYFyNUDGnIf2QAmKN0OxELR0dEomkFAQ0ODISUlhYGJiYkHyO1FdwHMAD+Qk7W1tbEGlIyMDIOSkhJYHdC1bCgGAAU4QbaLi4vjDW0xMTEQxQzEoigGAP30HUh/gQYWTgCV/wvEr7F5YffLly8Zbt26hVXz8+fPYXIHgRb+wmZAMcgVy5YtY7h79y6G5gULFjD8/QuynOEevnQQCKQWgdKBoqIiAyhM3rx5w3D//n2QZpAiRqieDqArKjEMgBoCSn2NQGwDxCpADIrz40C8AIjnA7E0uiGMxOYFoOEgAw+gG8JISmbCYkgZI6m5Ec2QNYzkZGdoWIFy7EqAAAMAObWTUmudGf4AAAAASUVORK5CYII=",
            "Designer.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAK0SURBVHjaYmxoaGAAgglAXMBABqivr4ez/Zp3qgOpRUAcuqnW/RFIjAkqlw+1hGTw69cvMAYargXkHgBiMyA+DOTLIVsAs2QyOZZ8+PprjbeJzHEgUwIqBDJ8NYjBgqY2B0rnEmt4SOd+LSEedtsCPy0+FUk+hunbbzD8+vPvBVAqDt0HyJZMI8bws0wWoGDZ++7LT7GG5RcY3n3+yZDorPoNKOYAjIOb2HwAA5lQOouQ4bBg+ff/P8PiA3efApnOa8odb8LUMeFxIMiSmXgMP4AU5iCAYTguC5CDJw3dEiTDRdENBwULGxsbAwjjsyAbLTWBLJlDwHB4mKMDXHGQh5aakr8w8AkAaTscht/BFc5MeHJoHizzOXmHMDzl1A3GYrgtPsPxWgDKnZWVlYWfGPmXTN/3nOHLz78M6IYb/ztxn1BSZsEnWTTvlMkjRk13BiTDWRl+Maj8u3mci+HrI2LyCjYf/AfhBw8e/E90Uj5triYKDxY2hp8MpT7KDMmRfiFA7nwgZibHAjD4/OMvw9RtNxkibRUZjJWFwYaX+KgwCHGzMCxfvhykJBZkSWNjIzNZFlx49JXhDTDrN626yGCnJcZQ5K2MbDgMgCxZhM8ScByk8x1jZGBgZPn/5ycrKIQYmVgYMs6brbPWlNS6fONehubelgP//0HiIZ2HmeH/399A1WwM///8YmBkZmX4/+8P2/OegwyMjIxAuT8MkmUHv7/odwerZ/wPLEOgnP/INrPLmzAw8Qgx/Hp4juHvlzckFd8ShTsZYRYwgCx43ucGwv9hgApshue9rmBzwXEA8haaC0hii+duwvQGKEiBGGwBM58YAyWAkYUdS1r/zyAQ0ASJg39f3jK8mh31n4FKABQHP++eYGBXtoBYAASLgRgUTl+pZAeoVlwJT0W0BAABBgBNYEtP4534wwAAAABJRU5ErkJggg==",
            "DropDownButton.png": "data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AgwWs3gAAACpJREFUeNpivMmACpgY6CHAAqH+MzAwMDAiqWCE8eFaGKF8hBmMtHQYYACNOgIA+vDCDAAAAABJRU5ErkJggg==",
            "Office2010Black.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "Office2003.Loading.gif": "data:image/gif;base64,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",
            "Office2007Silver.Loading.gif": "data:image/gif;base64,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",
            "Loading.gif": "data:image/gif;base64,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",
            "RemoveItemButton.png": "data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AgwWs3gAAAE5JREFUeNqkjsEJwDAMA8+hO9YjVrtkgUJ2UR8pOPm29zBYoLPjZqfxLbBrNoCQwYqqpGwlAPGe7SM3qcc0wDF3JddZDish5dXx+/WVZwBwlxrSVfhUbAAAAABJRU5ErkJggg==",
            "Office2010Silver.Loading.gif": "data:image/gif;base64,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",
            "NextPage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABhSURBVHjaYvz//z8DJYCRUgMYQAagY5/G7f+xiWPDTLgM9m3aQZTTmPBJEmMIEyEFhAxhIsaZ+AxhIjawcRlCtAGb6zwYyTYAl2aiDMCnmaABhDRTJSUyDnhmotgAgAADAB9+gDvqx6+SAAAAAElFTkSuQmCC",
            "FirstPageDiabled.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACISURBVHjatNbBDsAQEARQK/1tp/1w0mOlmJldjg3zBF2s915utufvo7t/1NaaIWHvuLlvzZrpPKlUYBWeAuzCw8ApPAQg4TKAhksAE04DbDgFKOEwoIbDAFoqQkukItQmKwh9TFlE+tEYRC4VKBIqdggSLtcnJOXC2SFpV+YKsduviloutyHAADHHNisEgmXKAAAAAElFTkSuQmCC",
            "GetFlashPlayer.gif": "data:image/gif;base64,R0lGODlhngAnALMAAAcHB////35+fkNDQ84gJ9vV1aCgoMw+Q8MnLYiIiLy7u2ZmZtx6feWcniIiIgAAACH5BAkAAA8ALAAAAACeACcAAAT+kMhJq7046827/2AojldgnmiqrmzrvnAsxyQ533iu73Qt8sCg0CUoGo0t32/IbPKO0KQS5KxaY9CjdDo5HDLXsBiVRbK4h0bB1AC3EnDFzSA3FeAJwxplgO8DfXkneAl/YWVFWzUMKW0YLAYDCQoJCyyFKgMDJwoOcAsAAieaCQKhJgMLCZomAHiGV4iiZzUHsAGOJSqRLIYDsAYCDnsKmycOBgEDsyYOcgN1AK1jKbKKIre4bikOLJqeygADyaMFAgkmxXwLBdIolcpyq9PUJ9a0I3UquRa7lgGUMP2aVsDYiQLdEKYzCBAaw4bhACBrpelhLETXPjBq5EWDCjj+6RI4M+AJjjQD/wZB67RG3YlILl9ughagoBwACnLWu7fCRgoGHT4yCyCtUk4Fa0CicFBxGcRRyQAYUhXPBEh3VmRp1RJgxMYTQIOmaPen6EOaBw22e1rQ2Ko686oivCmm1FaMJkaM/bDCgDhSqCqaEEYuwDkU4xQAWCyJj4PFKQcsdtVqMjond+5m+SPiwE8vXza0uJWtHjVzmo0YEtGgFwLRpmPvUJBaQOG8IDy3eO1Rtm8cwe7exv2h9W7Yv5PHCC5rOHEPpU3w3qa8eout+Drodo3cunehWS73/AALNGgOu/DIW4HpIJxkBW7rQRGw/fwUdAbxia8e4CsdmR3+0d542v20BGKqTEKUCp2I59c5m8RUlUql4DQhYgaNY8dMCcojiSnOxYCaai6Ql0JoVKSAFj0oqNINKrdJuGIASvEyIyDCEPOihjPWaJEMtBWhT3YaGHcCP3ypOCRWxyizhwApPYXKkEqpc+Mvh8HoUo+XocRDHyGmsMEBDNyCYooYarIGk4BY4uVglAH0lyYWDoJOQcnMqJBCdjjgTGBq0vjhQDxEh4IGpZ2J5iiTRKPiJH6h0FZDRxVDpWVTvrPSMCcsEFmjVkmiYT0ZbNdIDZksKemcEyGWE0NcKrlUU8wodSGNl3FKTakrIBlCqigwWYpMgKxBloxUipfphgdhYWVrrID8WAWvkoaFqqwnTOYKodMksNhEyL6jbETiZAmjVeJJxhiujO6KwXYFWOvDd/QGocF5XBBQ77465OsBvwDP4K9YARec0cD9GKywCgh3t/DCDff28MMRV2zxxQhHAAA7",
            "Office2007Black.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "WholeReport.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAACISURBVHjaYixbPt2egYGhC4jNGIgHp4C4DIgPsgCJFUAswUAaMIPqk2RB1twZkYGiqnzFDKxiUADWx4Ru9PKDd8CYkBgMsKALRNqrMBAjBgMD7wJGYDT+ZyAfMKK4gMRYYBiNBUQsPAHS0mTEwFMglgF5IQWIX5Co+QVUH9gLO0C5ityEABBgAK7WRrrRnAlbAAAAAElFTkSuQmCC",
            "SavePpt2007.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEXSURBVHjaYnzgJ72XgYHBiYE8sI8BaMB/EIaBD8t78fJBAKYHhJmQjXvoL8PAH1GElQ9iI9MwgGKA/MYnDB9X9OHkYwMs6C7Ax8cGGEH+YKAEbNu27T+5AKSXBZuh///8ZviwqJ3h27GtDP///WXgMnNjEEyqY2Bk48BQy4TNgPcLWsAaxZpXMvB6xILF3s2owuoDrAZ8O7SBgT80D2gjO8PPG2cZmAVEGb4e3gR2GVEGwMC/T+8ZuJ1CGPiCs4Ccv8S7gMsugOHj6kkMzHxCDBzalgwfFncycNsHMjCysBJngGBCDZh+XurD8LzQjeHfj68MQhlthBMSPHEAbRJKaQRjQoCJgUIAcsGO7du3e5CpfwdAgAEA6lXBi/2RZTAAAAAASUVORK5CYII=",
            "Office2010Silver.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAADAFBMVEWjvePV4fJ8enxTAoN3H6gAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAE4ACABgAAp3H6gY9jAAAABEAAAAOgBXAFwAbwBrAHIAXABvAEYAcgBWACAAaQB3AGUAZQBcAHIAMQAzADIAXABlAFMAbABjAGUAdABkAGUASQBlAHQAbQBwAC4AbgAAAGcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUfqwH1kHcBABgAAACTEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgALUAupkAAAD1sAAKABgDyAAABPcSKAAAdpN2jyobACB/6AABALoAAAC6mdj11AAjABh3HuAe36UAAHcAAAAAAAAAAAD2WABGABh2kMYY9ljGoAAAdpAAAACD//9jjAKMAn4CfmMAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC1AACJGAAAA10dOTGKAAAAAWJLR0T/pQfyxQAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAC1JREFUeNpjYMAKGDHAAAkyMWEKQsXggiA+TAyhkokJLoakHSHGOJi8iRDEAgAXYAFTLVxyPgAAAABJRU5ErkJggg==",
            "Office2010Black.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ5JREFUeNpi/P//P8Plrc3/P1xbx0AJENAKYtD1rmVkubyt5f+H6+sZbKNdKTLw8LL1DJcZGf8zHuox+m8b7shADXB45X4GFgZGRgaGv/+pYiDILIiB/6lqIBMDw79/VDKQiRYuZAK5EIuBOCxhVJ8Ckb6ViynJRKIL4YbdzMGuBx6G2OQ0kDSjGwZm4ApDJkassiCNIENgBqEYhstEoFlMYBfiAMgGoBqGL5aZcBgIDaP/N7LxRhL2SAFhqiYbNmYQj0LT/kNcyMjGzsDAzEwV80BmsYA5zExUMRAEIGHIwkS1MGTilnVjOLrnBsTbFGCQGSCzGEFVwPmDk/9/ebKbIsfxyLgyGNrnMgIEGABSj14mjAo5NQAAAABJRU5ErkJggg==",
            "ArrowDown.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAFCAMAAACgjTZZAAADAFBMVEX///9mZmZqa2twcHF2dnZ7fHyBgYGGhoeKi4uOjo7///9ub27Y2Nng4ODp6enw8PH29vaNjY53d3fk5OTt7e309PSLjIyAgYDw8fCJiouHiYkAbwBrAHIAXAByAEEAcgB3AG8ARAB3AG8AbgBwAC4AbgAAAGcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAbAAAAAACYAAAAGPUJqwH1kHcBABgAAABUEeQAAHYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoAL8AwsEAAAD1sAAEABgCtAAAAIkSKAAAdlR2UCobACCv0AABAMIAAADCwSD11AAjABh3COAI36UAAHcAAAAAAAAAAAD2WABGABh2UcYY9ljGoAAAdlEAAAAw///w4ALgAjACMPAAABgAAAAwAAAAGPYAAEAAAAAcAAAAGPYAAAAAAAAAAAAAAAAAAAAADAACAAAAAAAAAQH2lAAAABgAAAC/AADYiAB/Y8jCAAAAAXRSTlMAQObYZgAAAAFiS0dECfHZpewAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAtSURBVHjaY2BkYmZhZWPn4GRg4Obh5eMXEGQAAiFhEVExBjAQl5BkgAIpEAEAI5sBViE2gUcAAAAASUVORK5CYII=",
            "Office2003.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "LastPage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAABeSURBVHjaYvz//z8DJYCJgUKAYoBv0w6szgGJwzBBF+AyhCQvkGIIzjAg1hC8gUiMIQRjgZAhBA3YXOfBSLYBhDTjNYAYzTgNIFYzVgNI0YxhAKmaQYBxwHMjQIABANL8JauSyptCAAAAAElFTkSuQmCC",
            "GuidButton.png": "data:image/png;base64,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//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AgwWs3gAAACFJREFUeNpivMmACpgYhrbAfySMXQUjEsZQAQAAAP//AwCocAP5dkyIIAAAAABJRU5ErkJggg==",
            "Office2007Silver.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAWJJREFUeNqslb1OwzAQgC/RDR4YbmDI0KESGyzpG1SCgfeAR2JF4hEYGUDqiFiaBQZUJAaGDB08dLghUjjbSePUCSlNT3F8558v5/PFjsqyhK/lfQlHkLPZTRSt3u5KShKgyfUomP55Ap3ngLxhB9ssvG4lhf9hgzDmkK8eBFhIR12s8M4kU+se25PCVVgr7a/v6n01tJxgZvGQ2TVwLuVbxk4PC+IJO6D10MD0Y/Wx7EBgalyEuIndfoLnz7aEImFAJcDWRgzDbPw/rjp63cbG+3ryN6yRXg/riT54COaAWKcAeTUFgBBG4ZKFhY1BLjmxGlzpxeetvLRrt23k2dTYLqvlQX+jkuaP6dIRQtuukLZh85YM0EqhLh0ptP1x2yXjazN4MHeo2zYMCUmsDJLT8YdhIQylzGljYpK5uIwRzKq9naSg1wrodDHugF3PgaYMkbkC3pcvR7kCLmaX0a8AAwDOipVbk6mXKwAAAABJRU5ErkJggg==",
            "WindowsXP.Editor.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGISURBVHjalFLdSkJBEJ4Vb6S6KrotepSI7jpBkYSBGWEZqYlZJIFFCJlCddEfZDcJPUA+VCDkjRXWObvTzC5HM49pH+ews7Mz3/yK2OEdAgMRFJBIn1J8KlaBolORgNLcke/0/nS1J5AUfva9zW/CIOBInw7A2k6xpfMDtg02sjfEzpEQHooJrVtNX+iIHLlyngFbmSxc+CghLUQPrtnRKp/FBao2K8uVy7QIBAJWKFnUAfhvEbA/OxOs+8J2lQWu2ZyGgMFvwyNDVjRVgJ8BPBFOnaOLULzY07rVxN/gzn9JMpBoJkJYWD9BlsfGR63aS+1ZmjKEJ/NKooT1d8TXusRg7LQjg7lwDgfKQPiIXoiOjpumdt49CaQjwX6zoSEb4DhOF3lPguWtArpjosmDD3264/ORnNZXH/N6+3oSMHu5lIQPW0Kz2QRwBOSPU6AoiexRydj8VQLXF6HNM/uudHT+mdidfd8d6IeZpUz/KXhhNriv92ByasKaXtzl1PQedDXlv/gWYACo3RPdkUubNwAAAABJRU5ErkJggg==",
            "Office2010.Find.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAG3SURBVHjapFM7SANBEH0XVBItchaipLIRwSpwWNlcJTYSS8toEQMWWoigCJ6NWKmVJKliFxsJWKjYnIWSIuDZRVTYQIh2bkDx/GWd3TPRGBvJcLfFm5k3b2dmNSEEWjFNHjWSxfW9vM/faVzc3OF4J6bVgiSuSfy6jJNEvI7LPN8vQmNpdhyl21IDWP2oGst/4A0K1pKnebjccAoc7J6jU3vC2f6y1oTjEefZFe0vBcZqPILopAnTDKP8/NaIR01MTJgou+/NCqyEnZeBsgK/9yrpfqCjO4BQsBe6DoWxAgOnQHZk1RW0KRoXxnw0DPiDcFgF6YwNO+egj1xDg8DWXASVF8ApVLBNPiopaiQ+ycJdjmCQkgtFODmqwkmJCyxMDyv+y6siGBE7DvN08+/JaSQ/SQkxxjzp1DAlkzgQ6unC6MgAlE8C8pN++vt1PXVxuDoj7y+kUbKwc0xYaUf0m1bDdkWtrPITkcjaTMxv2CI8ZglvCsQGup+sokbF+L820YcW7V8E7GvEsh81nXKMqSlrN+Y10AO7Au34+cji6wdY28zg4dWv9oR7cSk1hVZfY8s9+BRgAJpCCS+6h+a+AAAAAElFTkSuQmCC",
            "MsgFormError.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKpSURBVHjaYryR7MIwkICFBLWcQOwKxIFArAvEckAsCpV7AcRPgfgsEG8C4t1A/ItaDuAH4mogzgRiHhxqJKDYGIjTgPgjEE8E4m4g/oLPcCYCloMMuwfEpXgsx+XoOqjeKHIcwAbEc4B4JhALURDFoChaCsQTgJiZWAeALN8CxMlUTGv5QLwamyOwOWAaNLFRG4ASbzshB2RS2efoAJSWQnA5ABTXLXTI+hOQEzQTmutwJjguLSMG2aJOBmYu3JlBwM4brIYAkAbiHHQH8EATCl7LQbRMcRdWR4AsF48rgKslIirYkB3gBy3pMACHvCqKgSA+uiNgliM7WCqjFp8DhGAJHeYAb1wqfzy8zfB67RwMR8EcgW45CPx+/RxDDxbgjVwUG+BT+W77SkipEpyC4gj52mkMrKKSGA5+0lvG8PfbF0IOMEAOARVCqkGOQPcVBZbD7WSCxj0bMTqwOYJMy2H1BcHKiGgASg9M3Lwk6wM54DuxdbeQZzhKOkCPDlBuQY8WPOAjcgjcIcdy9OAm0RF3kB1wgVTLQXF+vyIWa8Ik0hEXkB2wFZcqUHbDZjkswYES5stFEzAcgSuqkMBWZAdsgqYFrKn7cV85nP/t2jmGh81ZKMH/4dBWFEeA1Dyb0Yw3Q0HbjQzMOUZKDNBECCpbbbCpBpVs3+9cZWDlF0ZxDLpD/354x8DEyoZTDRJoAuKDIAYjUrMcVD7fprAJRgwAtZ41YI1VJrRgqaFDe6AAuaWMXhBNB+K5NLS8D4jXEGoTZsESCJXBeiAuI6ZRCkqQPkC8gIqWTwHiUFDZRWy/AOSIRGhofKTAYlC6igPiXGyWE1MZgdKEEjTuvpNgMSiRtQKxPBAvxqeQkYTeMXrnVBEpy74G4ke06pzCwHeo4ZuomTIBAgwAJnDUiFcmQv8AAAAASUVORK5CYII=",
            "SaveOdt.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFtSURBVHjaYnTNrdvLwMDgxEAe2McE0+xlZcKwa1IjmAYBEHtqaToKHwvtxAQzqiDCl8Etrx5Mw0B290wUPjbARIp7QbaCLIG5AgRYYIwJKzaDJUA0DIC8AOMv3n6AQZifB8zeduwMw9uPX8BsRmAg/megBGzbtu0/uQCklwWboaev3mR48Owlg7KMJIORpirpgQjSJCchxtA6dxlDw4xFeA1gBDnD09MTq+S3Hz8ZfHJrGLg42BkkRYUYdFUUGWJ8XBiE+HjB8tu3b0fEwu3HzxhW7T3KcPPhUwZ1eWmG9EB3BhF+PoaqlEgGDjY2BmlxEYY37z8yLNmyhyEvKhB3IL79+Pl/6eT5/0MqO/+fvX7n/4fPX0gLRCE+Hob65AiGhOZJDBXTIP6XAjrfQFWJIdHHiYGfhxtFPdZY4ObkAHsBpFhNVhIsdgPotRW7j4DFCRoAAi6m+ih8c201MEYHIAN2AEPTg8x0uAMgwAAQguAgzbf9ngAAAABJRU5ErkJggg==",
            "ArrowRight.png": "data:image/png;base64,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",
            "Office2010.SelectedItem.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQ5JREFUeNpi/P//P8Plrc3/P1xbx0AJENAKYtD1rmVkubyt5f+H6+sZbKNdKTLw8LL1DJcZGf8zHuox+m8b7shADXB45X4GFgZGRgaGv/+pYiDILIiB/6lqIBMDw79/VDKQiRYuZAK5EIuBOCxhVJ8Ckb6ViynJRKIL4YbdzMGuBx6G2OQ0kDSjGwZm4ApDJkassiCNIENgBqEYhstEoFlMYBfiAMgGoBqGL5aZcBgIDaP/N7LxRhL2SAFhqiYbNmYQj0LT/kNcyMjGzsDAzEwV80BmsYA5zExUMRAEIGHIwkS1MGTilnVjOLrnBsTbFGCQGSCzGEFVwPmDk/9/ebKbIsfxyLgyGNrnMgIEGABSj14mjAo5NQAAAABJRU5ErkJggg==",
            "ArrowDownGray.png": "data:image/png;base64,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",
            "CheckBox.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAC7SURBVHjaYvz//z8DqYBxcGnq7u4uAlK9QDy3tLQ0hYkIDfZAqguILwBxLkiMmZubm/PYsWNHgXg2EP+3trY+iKRBGkjtBeK/QOwKtOUV3HlASVEg+xgQqwBxPVCyCSjGBmQfBmIzIA4Fiq3B8BNQkQpUI8iAeiCWA+JkIJ4I1FCAMyCAGkGmHgBiTqjQcSB2AGr6hTf0gBoDgdQ6IH4NxCZADY8wQgekCR13dXVVALEHNjkQpl+KAAgwAKCmeGnxQrElAAAAAElFTkSuQmCC",
            "OnePage.png": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAB9SURBVHjaYixbPt2egYGhC4jNGIgHp4C4DIgPsgCJFUAswUAaMIPqk2SBaeZgZWNoDE4iqLN8xQwYE6yPiYFCwIJNcPnBOxhikfYqxBuAS/GoCwarC6iSkJ4CsfSP37+Qkykx4CnMBSlA/IJEi19A9YFdsAOUq8j1AkCAAQDiLiK1dsl6lQAAAABJRU5ErkJggg=="
        },
        dateRanges: ["CurrentMonth", "CurrentQuarter", "CurrentWeek", "CurrentYear", "NextMonth", "NextQuarter", "NextWeek", "NextYear", "PreviousMonth", "PreviousQuarter", "PreviousWeek", "PreviousYear", "FirstQuarter", "SecondQuarter", "ThirdQuarter", "FourthQuarter", "MonthToDate", "QuarterToDate", "WeekToDate", "YearToDate", "Today", "Tomorrow", "Yesterday"]
    },
    A.loc && this.collections.loc && (this.collections.loc = A.loc),
    this.controls = {},
    this.controls.head = document.getElementsByTagName("head")[0],
    this.controls.viewer = document.getElementById(this.options.viewerId),
    this.controls.mainPanel = document.getElementById(this.options.viewerId + "_JsViewerMainPanel"),
    this.controls.findHelper = {
        findLabels: []
    },
    this.reportParams = {
        reportGuid: this.options.reportGuid,
        paramsGuid: null,
        drillDownGuid: null,
        pageNumber: 0,
        pagesCount: 0,
        pagesWidth: 0,
        pagesHeight: 0,
        zoom: this.options.toolbar.zoom,
        viewMode: this.options.toolbar.viewMode,
        reportFileName: null,
        pagesArray: [],
        interactionCollapsingStates: null,
        bookmarksContent: null,
        editableParameters: null,
        drillDownParameters: []
    },
    this.options.actions.printReport || (this.options.actions.printReport = this.options.actions.viewerEvent),
    this.options.actions.exportReport || (this.options.actions.exportReport = this.options.actions.viewerEvent),
    this.options.actions.interaction || (this.options.actions.interaction = this.options.actions.viewerEvent),
    this.options.requestStylesUrl) {
        var e = this.options.requestStylesUrl.replace("{action}", this.options.actions.viewerEvent);
        e += e.indexOf("?") > 0 ? "&" : "?",
        e += "jsviewer_resource=styles&jsviewer_theme=" + this.options.theme + "&jsviewer_version=" + this.options.shortProductVersion;
        var t = document.createElement("link");
        t.setAttribute("type", "text/css"),
        t.setAttribute("rel", "stylesheet"),
        t.setAttribute("href", e),
        this.controls.head.appendChild(t)
    }
    this.InitializeJsViewer(),
    this.InitializeToolBar(),
    this.options.toolbar.showFindButton && this.InitializeFindPanel(),
    this.InitializeDrillDownPanel(),
    this.InitializeDisabledPanels(),
    this.InitializeAboutPanel(),
    this.InitializeReportPanel(),
    this.InitializeProcessImage(),
    this.InitializeDatePicker(),
    this.InitializeToolTip(),
    this.options.toolbar.showSaveButton && this.options.toolbar.visible && this.InitializeSaveMenu(),
    this.options.toolbar.showSendEmailButton && this.options.toolbar.visible && this.InitializeSendEmailMenu(),
    this.options.toolbar.showPrintButton && this.options.toolbar.visible && this.InitializePrintMenu(),
    this.options.toolbar.showZoomButton && this.options.toolbar.visible && this.InitializeZoomMenu(),
    this.options.toolbar.showViewModeButton && this.options.toolbar.visible && this.InitializeViewModeMenu(),
    (this.options.exports.showExportDialog || this.options.email.showExportDialog) && this.InitializeExportForm(),
    this.options.toolbar.showSendEmailButton && this.options.email.showEmailDialog && this.options.toolbar.visible && this.InitializeSendEmailForm(),
    this.addHoverEventsToMenus();
    var o = this;
    this.addEvent(document, "mouseup", function(A) {
        o.DocumentMouseUp(A)
    }),
    this.addEvent(document, "mousemove", function(A) {
        o.DocumentMouseMove(A)
    }),
    document.all && !document.querySelector && alert("Your web browser is not supported by our application. Please upgrade your browser!"),
    this.controls.viewer.style.top = 0,
    this.controls.viewer.style.right = 0,
    this.controls.viewer.style.bottom = 0,
    this.controls.viewer.style.left = 0,
    this.options.appearance.userScrollbarsMode = this.options.appearance.scrollbarsMode,
    this.changeFullScreenMode(this.options.appearance.fullScreenMode)
}
StiJsViewer.prototype.ShowAnimationVerticalMenu = function(A, e, t) {
    var o = A.innerContent.offsetTop;
    clearTimeout(A.animationTimer);
    var i = new Date
      , s = i.getTime()
      , n = Math.round((e - o) / ((Math.abs(t - s) + 1) / 30));
    Math.abs(n) > Math.abs(e - o) && (n = e - o),
    o += n;
    var a;
    s < t ? (a = o,
    A.animationTimer = setTimeout(function() {
        A.jsObject.ShowAnimationVerticalMenu(A, e, t)
    }, 30)) : (a = e,
    A.style.overflow = "visible",
    A.animationTimer = null),
    A.innerContent.style.top = a + "px"
}
,
StiJsViewer.prototype.ShowAnimationForm = function(A, e) {
    A.flag || (A.currentOpacity = 1,
    A.flag = !0),
    clearTimeout(A.animationTimer);
    var t = new Date
      , o = t.getTime()
      , i = Math.round((100 - A.currentOpacity) / ((Math.abs(e - o) + 1) / 30));
    Math.abs(i) > Math.abs(100 - A.currentOpacity) && (i = 100 - A.currentOpacity),
    A.currentOpacity = A.currentOpacity + i;
    var s;
    o < e ? (s = A.currentOpacity,
    A.animationTimer = setTimeout(function() {
        A.jsObject.ShowAnimationForm(A, e)
    }, 30)) : (s = 100,
    A.flag = !1,
    A.animationTimer = null),
    A.style.opacity = s / 100
}
,
StiJsViewer.prototype.ShowAnimationForScroll = function(A, e, t, o) {
    if (!A)
        return;
    var i = 0;
    A.jsObject.options.appearance.scrollbarsMode ? i = A.scrollTop : (i = document.documentElement.scrollTop,
    0 == i && (i = document.getElementsByTagName("BODY")[0].scrollTop)),
    clearTimeout(A.animationTimer);
    var s = new Date
      , n = s.getTime()
      , a = Math.round((e - i) / ((Math.abs(t - n) + 1) / 30));
    Math.abs(a) > Math.abs(e - i) && (a = e - i),
    i += a;
    var r, l = this;
    n < t ? (r = i,
    A.animationTimer = setTimeout(function() {
        l.ShowAnimationForScroll(A, e, t, o)
    }, 30)) : (r = e,
    o && o()),
    A.jsObject.options.appearance.scrollbarsMode ? A.scrollTop = r : window.scrollTo(0, r)
}
,
StiJsViewer.prototype.easeInOutQuad = function(A) {
    return A < .5 ? 2 * A * A : -1 + (4 - 2 * A) * A
}
,
StiJsViewer.prototype.animation = function(A) {
    var e = (new Date).getTime();
    for (var t in window.this_.options.animations) {
        var o = window.this_.options.animations[t]
          , i = o.el;
        if (o.duration <= e - o.start) {
            for (var s in o.animations) {
                var n = o.animations[s];
                i.style[n.style] = parseFloat(n.end) + n.postfix
            }
            n.finish && n.finish(),
            window.this_.options.animations.splice(t, 1)
        } else
            for (var t in o.animations) {
                var n = o.animations[t];
                i.style[n.style] = parseFloat(n.start) + window.this_.easeInOutQuad((e - parseFloat(o.start)) / o.duration) * (parseFloat(n.end) - parseFloat(n.start)) + n.postfix,
                console.log(i.style[n.style])
            }
    }
    window.this_.options.animations.length > 0 && window.requestAnimationFrame(window.this_.animation)
}
,
StiJsViewer.prototype.animate = function(A, e) {
    A.style.transitionDuration = e.duration + "ms";
    var t = "";
    for (var o in e.animations)
        t += ("" != t ? ", " : "") + (e.animations[o].property || e.animations[o].style);
    A.style.transitionProperty = t;
    for (var o in e.animations) {
        var i = e.animations[o];
        A.style[i.style] = i.end + i.postfix,
        i.finish && setTimeout(function() {
            i.finish()
        }, e.duration)
    }
    setTimeout(function() {
        A.style.transitionDuration = ""
    }, 2 * e.duration)
}
,
StiJsViewer.prototype.DocumentMouseUp = function(A) {
    this.options.formInDrag = !1
}
,
StiJsViewer.prototype.DocumentMouseMove = function(A) {
    this.options.formInDrag && this.options.formInDrag[4].move(A)
}
,
StiJsViewer.prototype.SetEditableMode = function(A) {
    this.options.editableMode = A,
    this.controls.buttons.Editor && this.controls.buttons.Editor.setSelected(A),
    A ? this.ShowAllEditableFields() : this.HideAllEditableFields()
}
,
StiJsViewer.prototype.ShowAllEditableFields = function() {
    this.options.editableFields = [];
    for (var A = this.controls.reportPanel.pages, e = 0; e < A.length; e++) {
        var t = A[e]
          , o = t.getElementsByTagName("*");
        for (k = 0; k < o.length; k++) {
            var i = o[k].getAttribute("editable");
            if (i) {
                var s = i.split(";")
                  , n = {};
                n.compIndex = s[0],
                n.pageIndex = e.toString(),
                n.type = s[1],
                "CheckBox" == n.type ? this.ShowCheckBoxEditableField(o[k], n, s) : "Text" == n.type ? this.ShowTextEditableField(o[k], n) : "RichText" == n.type && this.ShowRichTextEditableField(o[k], n)
            }
        }
    }
}
,
StiJsViewer.prototype.HideAllEditableFields = function() {
    var A = this.options.editableFields;
    this.options.currentEditableTextArea && this.options.currentEditableTextArea.onblur();
    for (var e = 0; e < A.length; e++)
        A[e].className = A[e].className.replace(" stiEditableField stiEditableFieldSelected", ""),
        A[e].onclick = null,
        A[e].style.outline = ""
}
,
StiJsViewer.prototype.ShowCheckBoxEditableField = function(A, e, t) {
    if (!A.sizes) {
        var o = A.getElementsByTagName("IMG");
        0 == o.length && (o = A.getElementsByTagName("SVG"));
        var i = o.length > 0 ? o[0] : null;
        if (!i)
            return;
        A.sizes = {
            inPixels: i.offsetWidth > i.offsetHeight ? i.offsetHeight : i.offsetWidth,
            widthStyle: i.style.width,
            heightStyle: i.style.height
        }
    }
    "Google Chrome" != this.getNavigatorName() && (A.style.outline = "1px solid gray"),
    A.style.textAlign = "center",
    A.className += " stiEditableField stiEditableFieldSelected";
    var s = this.GetSvgCheckBox(t[3], t[5], this.StrToInt(t[6]), t[7], A.sizes.inPixels)
      , n = this.GetSvgCheckBox(t[4], t[5], this.StrToInt(t[6]), t[7], A.sizes.inPixels);
    e.falseImage = "<div style='width:" + A.sizes.widthStyle + ";height:" + A.sizes.heightStyle + ";'>" + s + "</div>",
    e.trueImage = "<div style='width:" + A.sizes.widthStyle + ";height:" + A.sizes.heightStyle + ";'>" + n + "</div>",
    e.checked = "true" == t[2] || "True" == t[2],
    A.params = e,
    A.jsObject = this,
    A.hasChanged || (A.checked = e.checked,
    A.innerHTML = e.checked ? e.trueImage : e.falseImage),
    A.onclick = function() {
        this.checked = !this.checked,
        this.innerHTML = this.checked ? e.trueImage : e.falseImage,
        this.hasChanged = !0,
        this.jsObject.AddEditableParameters(this)
    }
    ,
    this.options.editableFields.push(A)
}
,
StiJsViewer.prototype.ShowTextEditableField = function(A, e) {
    A.className += " stiEditableField stiEditableFieldSelected",
    "Google Chrome" != this.getNavigatorName() && (A.style.outline = "1px solid gray"),
    A.params = e,
    A.jsObject = this,
    A.onclick = function() {
        if (this.editMode)
            return;
        this.jsObject.options.currentEditableTextArea && this.jsObject.options.currentEditableTextArea.onblur(),
        this.editMode = !0;
        var e = document.createElement("textarea");
        e.jsObject = this.jsObject,
        e.style.width = this.offsetWidth - 5 + "px",
        e.style.height = this.offsetHeight - 5 + "px",
        e.style.maxWidth = this.offsetWidth - 5 + "px",
        e.style.maxHeight = this.offsetHeight - 5 + "px",
        e.className = this.className.replace(" stiEditableField stiEditableFieldSelected", "") + " stiEditableTextArea",
        e.style.border = "0px",
        e.value = this.innerHTML,
        this.appendChild(e),
        e.focus(),
        this.jsObject.options.currentEditableTextArea = e,
        e.onblur = function() {
            A.editMode = !1,
            A.innerHTML = this.value,
            this.jsObject.options.currentEditableTextArea = null,
            this.jsObject.AddEditableParameters(A)
        }
    }
    ,
    this.options.editableFields.push(A)
}
,
StiJsViewer.prototype.ShowRichTextEditableField = function(A, e) {}
,
StiJsViewer.prototype.AddEditableParameters = function(A) {
    this.reportParams.editableParameters || (this.reportParams.editableParameters = {});
    var e = {};
    e.type = A.params.type,
    "CheckBox" == e.type && (e.checked = A.checked),
    "Text" == e.type && (e.text = A.innerHTML),
    this.reportParams.editableParameters[A.params.pageIndex] || (this.reportParams.editableParameters[A.params.pageIndex] = {}),
    this.reportParams.editableParameters[A.params.pageIndex][A.params.compIndex] = e
}
,
StiJsViewer.prototype.GetSvgCheckBox = function(A, e, t, o, i) {
    var s = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="' + i + 'px" height="' + i + 'px">'
      , n = '<path stroke="' + e + '" stroke-width="' + t + '" fill="' + o + '" stroke-linecap="round" stroke-linejoin="round" transform="scale(' + 1 / (200 / i) + ')" d="'
      , a = "";
    switch (A) {
    case "Cross":
        a = "m 62.567796,147.97593 c -0.55,-0.14223 -2.162828,-0.5128 -3.584062,-0.82348 -3.647667,-0.79738 -9.670499,-5.83775 -14.242817,-11.91949 l " + "-3.902341,-5.19058 5.080199,-1.13481 c 7.353071,-1.64253 13.640456,-5.71752 21.826811,-14.14646 l 7.208128,-7.42171 " + "-6.410736,-7.513354 c -11.773129,-13.79803 -14.346726,-23.01954 -8.627769,-30.91434 2.894109,-3.9952 11.818482,-12.369333 " + "13.182086,-12.369333 0.411356,0 1.063049,1.6875 1.448207,3.750003 0.980474,5.25038 6.456187,16.76587 10.936694,23 2.075266,2.8875 " + "3.991125,5.25 4.257464,5.25 0.266339,0 3.775242,-3.4875 7.797566,-7.75 16.397034,-17.37615 29.674184,-19.76481 38.280564,-6.88699 " + "4.15523,6.21753 4.18631,8.07093 0.14012,8.3552 -5.84833,0.41088 -17.16241,8.5342 -25.51465,18.319104 l -4.63153,5.42599 " + "4.87803,4.31529 c 6.55108,5.79533 18.8991,11.89272 25.84076,12.76002 3.0455,0.38051 5.53727,1.10582 5.53727,1.6118 0,2.7809 " + "-9.26611,14.41872 -13.03,16.36511 -7.96116,4.11687 -16.36991,0.71207 -32.764584,-13.26677 l -4.985957,-4.25125 -7.086791,8.97188 c " + "-3.897736,4.93454 -8.82141,10.1198 -10.9415,11.52281 -3.906121,2.58495 -8.86588,4.41339 -10.691162,3.94136 z";
        break;
    case "Check":
        a = "M 60.972125,162.49704 C 51.172676,136.72254 43.561975,123.37669 35.370344,117.6027 l -4.45827,-3.14248 2.75159,-2.89559 c 3.875121,-4.07793 " + "10.034743,-7.49924 14.902472,-8.27747 3.859874,-0.61709 4.458306,-0.38024 8.535897,3.37835 2.660692,2.45254 6.265525,7.60856 9.167226,13.11196 " + "2.630218,4.98849 4.910542,9.06999 5.067388,9.06999 0.156846,0 2.31372,-3.0375 4.793052,-6.75 C 96.259164,91.956015 129.68299,58.786374 157.56485,41.281603 l " + "8.84913,-5.555656 2.2633,2.631238 2.26329,2.631237 -7.76266,6.294183 C 139.859,66.19023 108.01682,105.51363 89.042715,138.83563 c -6.680477,11.73214 " + "-7.172359,12.31296 -15.090788,17.81963 -4.501873,3.13071 -9.044031,6.30443 -10.093684,7.05271 -1.708923,1.21826 -2.010678,1.09165 -2.886118,-1.21093 z";
        break;
    case "CrossRectangle":
        a = "m 24.152542,102.04237 0,-72.499996 74.5,0 74.499998,0 0,72.499996 0,72.5 -74.499998,0 -74.5,0 0,-72.5 z m 133.758188,0.25 -0.25819,-57.249996 " + "-58.999998,0 -59,0 -0.259695,55.999996 c -0.142833,30.8 -0.04446,56.5625 0.218615,57.25 0.375181,0.98048 13.207991,1.25 59.517885,1.25 l " + "59.039573,0 -0.25819,-57.25 z m -90.574091,43.18692 c -1.823747,-0.3912 -4.926397,-1.85716 -6.894778,-3.25768 -3.319254,-2.36169 -12.289319,-12.40741 " + "-12.289319,-13.76302 0,-0.32888 2.417494,-1.13897 5.372209,-1.80021 7.185193,-1.60797 13.747505,-5.93496 21.803114,-14.3763 l 6.675323,-6.99496 " + "-6.379078,-7.31436 C 64.931387,85.71231 61.643682,76.29465 65.471903,68.89169 67.054097,65.83207 78.56175,54.542374 80.098251,54.542374 c 0.45744,0 " + "1.146839,1.6875 1.531997,3.75 0.980474,5.250386 6.456187,16.765876 10.936694,22.999996 2.075266,2.8875 3.991125,5.25 4.257464,5.25 0.266339,0 " + "3.775244,-3.4875 7.797564,-7.75 16.39704,-17.376139 29.67419,-19.764806 38.28057,-6.88698 4.15523,6.21752 4.18631,8.07092 0.14012,8.35519 -5.82996,0.40959 " + "-18.23707,9.34942 -25.91566,18.67328 -3.90068,4.73647 -3.97203,4.95414 -2.2514,6.86861 3.19054,3.54997 13.7039,10.54321 18.97191,12.61967 2.83427,1.11716 " + "7.43737,2.33421 10.22912,2.70455 2.79175,0.37034 5.07591,0.9956 5.07591,1.38947 0,2.11419 -8.37504,13.20895 -11.6517,15.4355 -8.39423,5.70403 " + "-16.63203,2.77 -34.14289,-12.16054 l -4.985955,-4.25125 -7.086791,8.97188 c -9.722344,12.3085 -16.524852,16.55998 -23.948565,14.96754 z";
        break;
    case "CheckRectangle":
        a = "m 19.915254,103.5 0,-72.5 71.942245,0 71.942241,0 6.55727,-4.11139 6.55726,-4.11139 1.96722,2.36139 c 1.08197,1.298765 1.98219,2.644166 2.00049,2.98978 " + "0.0183,0.345615 -2.44173,2.53784 -5.46673,4.87161 l -5.5,4.243219 0,69.378391 0,69.37839 -74.999991,0 -75.000005,0 0,-72.5 z m 133.999996,3.87756 c " + "0,-49.33933 -0.12953,-53.514947 -1.62169,-52.276568 -2.78014,2.307312 -15.68408,17.90053 -24.32871,29.399008 -10.4919,13.955575 -23.47926,33.53736 " + "-29.514025,44.5 -4.457326,8.09707 -5.134776,8.80812 -14.291256,15 -5.28667,3.575 -9.903486,6.62471 -10.259592,6.77712 -0.356107,0.15242 -1.912439,-2.99758 " + "-3.458515,-7 -1.546077,-4.00241 -5.258394,-12.41205 -8.249593,-18.68809 -4.285436,-8.99155 -6.676569,-12.64898 -11.27758,-17.25 C 47.70282,104.62757 " + "44.364254,102 43.495254,102 c -2.798369,0 -1.704872,-1.66044 3.983717,-6.049158 5.593548,-4.31539 13.183139,-7.091307 16.801313,-6.145133 3.559412,0.930807 " + "9.408491,8.154973 13.919775,17.192241 l 4.46286,8.94025 4.54378,-6.83321 C 95.518219,96.605618 108.21371,81.688517 125.80695,63.75 L 143.21531,46 l " + "-53.650021,0 -53.650035,0 0,57.5 0,57.5 59.000005,0 58.999991,0 0,-53.62244 z";
        break;
    case "CrossCircle":
        a = "M 83.347458,173.13597 C 61.069754,168.04956 42.193415,152.8724 32.202285,132.01368 23.4014,113.63986 23.679644,89.965903 32.91889,71.042373 " + "41.881579,52.685283 60.867647,37.139882 80.847458,31.799452 c 10.235111,-2.735756 31.264662,-2.427393 40.964762,0.600679 26.18668,8.174684 " + "46.06876,28.926852 51.62012,53.879155 2.43666,10.952327 1.56754,28.058524 -1.98036,38.977594 -6.65679,20.48707 -25.64801,38.95163 -47.32647,46.01402 " + "-6.3909,2.08202 -10.18566,2.59644 -21.27805,2.88446 -9.033911,0.23456 -15.484931,-0.10267 -19.500002,-1.01939 z M 112.4138,158.45825 c 17.13137,-3.13002 " + "33.71724,-15.96081 41.41353,-32.03742 14.8975,-31.119027 -1.10807,-67.659584 -34.40232,-78.540141 -6.71328,-2.193899 -9.93541,-2.643501 " + "-19.07755,-2.661999 -9.354252,-0.01893 -12.16228,0.37753 -18.768532,2.649866 -17.155451,5.900919 -29.669426,17.531424 -36.438658,33.866137 " + "-2.152301,5.193678 -2.694658,8.35455 -3.070923,17.89744 -0.518057,13.139047 0.741843,19.201887 6.111644,29.410237 4.106815,7.80733 15.431893,19.09359 " + "23.36818,23.28808 12.061362,6.37467 27.138828,8.6356 40.864629,6.1278 z M 69.097458,133.41654 c -2.8875,-2.75881 -5.25,-5.35869 -5.25,-5.77751 " + "0,-0.41882 5.658529,-6.30954 12.57451,-13.0905 l 12.57451,-12.329 L 76.198053,89.392633 63.399628,76.565738 68.335951,71.554056 c 2.714978,-2.756426 " + "5.304859,-5.011683 5.75529,-5.011683 0.450432,0 6.574351,5.611554 13.608709,12.470121 l 12.78974,12.470119 4.42889,-4.553471 c 2.43588,-2.50441 " + "8.39186,-8.187924 13.23551,-12.630032 l 8.80663,-8.076559 5.34744,5.281006 5.34743,5.281007 -12.96155,12.557899 -12.96154,12.557897 13.13318,13.16027 " + "13.13319,13.16027 -5.18386,4.66074 c -2.85112,2.5634 -5.70472,4.66073 -6.34134,4.66073 -0.63661,0 -6.5434,-5.4 -13.12621,-12 -6.58281,-6.6 -12.3871,-12 " + "-12.89844,-12 -0.511329,0 -6.593363,5.60029 -13.515627,12.44509 l -12.585935,12.44508 -5.25,-5.016 z";
        break;
    case "DotCircle":
        a = "M 81.652542,170.5936 C 59.374838,165.50719 40.498499,150.33003 30.507369,129.47131 21.706484,111.09749 21.984728,87.42353 31.223974,68.5 " + "40.186663,50.14291 59.172731,34.597509 79.152542,29.257079 89.387653,26.521323 110.4172,26.829686 120.1173,29.857758 c 26.18668,8.174684 " + "46.06876,28.926852 51.62012,53.879152 2.43666,10.95233 1.56754,28.05853 -1.98036,38.9776 -6.65679,20.48707 -25.64801,38.95163 -47.32647,46.01402 " + "-6.3909,2.08202 -10.18566,2.59644 -21.27805,2.88446 -9.033907,0.23456 -15.484927,-0.10267 -19.499998,-1.01939 z m 29.999998,-15.098 c 20.68862,-4.34363 " + "38.01874,-20.45437 44.09844,-40.9956 2.36228,-7.9813 2.36228,-22.0187 0,-30 C 150.08927,65.371023 134.63549,50.297336 114.65254,44.412396 " + "106.5531,42.027127 90.741304,42.026386 82.695253,44.4109 62.460276,50.407701 46.686742,66.039241 41.6053,85.13096 c -1.948821,7.32201 -1.86506,23.11641 " + "0.158766,29.93754 8.730326,29.42481 38.97193,46.91812 69.888474,40.4271 z M 90.004747,122.6703 C 76.550209,117.63801 69.825047,101.82445 " + "75.898143,89.5 c 2.136718,-4.33615 7.147144,-9.356192 11.754399,-11.776953 5.578622,-2.931141 16.413098,-2.927504 22.052908,0.0074 18.03,9.382663 " + "19.07573,32.784373 1.91442,42.841563 -5.57282,3.26589 -15.830952,4.2617 -21.615123,2.09829 z";
        break;
    case "DotRectangle":
        a = "m 23.847458,101.19491 0,-72.499995 74.5,0 74.499992,0 0,72.499995 0,72.5 -74.499992,0 -74.5,0 0,-72.5 z m 133.999992,-0.008 0,-57.507925 " + "-59.249992,0.25793 -59.25,0.25793 -0.25819,57.249995 -0.258189,57.25 59.508189,0 59.508182,0 0,-57.50793 z m -94.320573,33.85402 c -0.37368,-0.37368 " + "-0.679419,-15.67942 -0.679419,-34.01275 l 0,-33.333335 35.513302,0 35.51329,0 -0.2633,33.749995 -0.2633,33.75 -34.570573,0.26275 c -19.013819,0.14452 " + "-34.876319,-0.043 -35.25,-0.41666 z";
        break;
    case "NoneCircle":
        a = "M 83.5,170.5936 C 61.222296,165.50719 42.345957,150.33003 32.354827,129.47131 23.553942,111.09749 23.832186,87.423523 33.071432,68.5 " + "42.034121,50.14291 61.020189,34.597509 81,29.257079 c 10.235111,-2.735756 31.26466,-2.427393 40.96476,0.600679 26.18668,8.174684 46.06876,28.926852 " + "51.62012,53.879155 2.43666,10.95232 1.56754,28.058527 -1.98036,38.977597 -6.65679,20.48707 -25.64801,38.95163 -47.32647,46.01402 -6.3909,2.08202 " + "-10.18566,2.59644 -21.27805,2.88446 -9.033909,0.23456 -15.484929,-0.10267 -19.5,-1.01939 z m 30,-15.098 c 20.68862,-4.34363 38.01874,-20.45437 " + "44.09844,-40.9956 2.36228,-7.9813 2.36228,-22.018707 0,-29.999997 C 151.93673,65.371023 136.48295,50.297336 116.5,44.412396 108.40056,42.027127 " + "92.588762,42.026386 84.542711,44.410896 64.307734,50.407697 48.5342,66.039237 43.452758,85.130959 c -1.948821,7.322 -1.86506,23.116411 " + "0.158766,29.937541 8.730326,29.42481 38.97193,46.91812 69.888476,40.4271 z";
        break;
    case "NoneRectangle":
        a = "m 24.152542,102.04237 0,-72.499997 74.5,0 74.500008,0 0,72.499997 0,72.5 -74.500008,0 -74.5,0 0,-72.5 z m 133.758198,0.25 " + "-0.25819,-57.249997 -59.000008,0 -59,0 -0.259695,55.999997 c -0.142833,30.8 -0.04446,56.5625 0.218615,57.25 0.375181,0.98048 " + "13.207991,1.25 59.517885,1.25 l 59.039583,0 -0.25819,-57.25 z"
    }
    return s + n + a + '" /></svg>'
}
,
StiJsViewer.prototype.FindPosX = function(A, e, t) {
    var o = t ? 0 : this.GetScrollXOffset(A, e);
    if (A.offsetParent)
        while (A.className != e) {
            if (o += A.offsetLeft,
            !A.offsetParent)
                break;
            A = A.offsetParent
        }
    else
        A.x && (o += A.x);
    return o
}
,
StiJsViewer.prototype.FindPosY = function(A, e, t) {
    var o = t ? 0 : this.GetScrollYOffset(A, e);
    if (A.offsetParent)
        while (A.className != e) {
            if (o += A.offsetTop,
            !A.offsetParent)
                break;
            A = A.offsetParent
        }
    else
        A.y && (o += A.y);
    return o
}
,
StiJsViewer.prototype.GetScrollXOffset = function(A, e) {
    var t = 0;
    if (A.parentElement)
        while (A.className != e) {
            if ("scrollLeft"in A && (t -= A.scrollLeft),
            !A.parentElement)
                break;
            A = A.parentElement
        }
    return t
}
,
StiJsViewer.prototype.GetScrollYOffset = function(A, e) {
    var t = 0;
    if (A.parentElement)
        while (A.className != e) {
            if ("scrollTop"in A && (t -= A.scrollTop),
            !A.parentElement)
                break;
            A = A.parentElement
        }
    return t
}
,
StiJsViewer.prototype.scrollToAnchor = function(A) {
    for (var e = 0; e < document.anchors.length; e++)
        if (document.anchors[e].name == A) {
            var t = document.anchors[e]
              , o = t.parentElement || t
              , i = this.FindPosY(t, this.options.appearance.scrollbarsMode ? "stiJsViewerReportPanel" : null, !0) - 2 * o.offsetHeight
              , s = new Date
              , n = s.getTime() + this.options.scrollDuration
              , a = this;
            this.ShowAnimationForScroll(this.controls.reportPanel, i, n, function() {
                var A = a.getPageFromAnchorElement(t)
                  , e = a.FindPosY(o, "stiJsViewerReportPanel", !0)
                  , i = A ? a.FindPosY(A, "stiJsViewerReportPanel", !0) : e
                  , s = document.createElement("div");
                a.controls.bookmarksLabel = s,
                s.className = "stiJsViewerBookmarksLabel";
                var n = 20 * (a.reportParams.zoom / 100)
                  , r = A ? A.offsetWidth - n - 6 : o.offsetWidth
                  , l = o.offsetHeight - 3;
                s.style.width = r + "px",
                s.style.height = l + "px";
                var c = A.margins ? a.StrToInt(A.margins[3]) : 0;
                s.style.marginLeft = n / 2 - c + "px";
                var p = A.margins ? a.StrToInt(A.margins[0]) : 0;
                s.style.marginTop = e - i - p - a.reportParams.zoom / 100 + "px",
                A.insertBefore(s, A.childNodes[0])
            });
            break
        }
}
,
StiJsViewer.prototype.isWholeWord = function(A, e) {
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
      , o = A.indexOf(e)
      , i = A.substring(o - 1, o)
      , s = A.substring(o + e.length, o + e.length + 1);
    return !("" != i && t.indexOf(i) != -1 || "" != s && t.indexOf(s) != -1)
}
,
StiJsViewer.prototype.goToFindedElement = function(A) {
    if (A && A.ownerElement) {
        var e = this.FindPosY(A.ownerElement, this.options.appearance.scrollbarsMode ? "stiJsViewerReportPanel" : null, !0) - A.ownerElement.offsetHeight - 50
          , t = new Date
          , o = t.getTime() + this.options.scrollDuration
          , i = this;
        this.ShowAnimationForScroll(this.controls.reportPanel, e, o, function() {})
    }
}
,
StiJsViewer.prototype.hideFindLabels = function() {
    for (var A = 0; A < this.controls.findHelper.findLabels.length; A++)
        this.controls.findHelper.findLabels[A].parentElement.removeChild(this.controls.findHelper.findLabels[A]);
    this.controls.findHelper.findLabels = [],
    this.options.findMode = !1
}
,
StiJsViewer.prototype.showFindLabels = function(A) {
    this.hideFindLabels(),
    this.options.findMode = !0,
    this.options.changeFind = !1,
    this.controls.findHelper.lastFindText = A;
    for (var e = this.controls.findPanel && this.controls.findPanel.controls.matchCase.isSelected, t = this.controls.findPanel && this.controls.findPanel.controls.matchWholeWord.isSelected, o = this.controls.reportPanel.pages, i = 0; i < o.length; i++) {
        var s = o[i]
          , n = s.getElementsByTagName("*");
        for (k = 0; k < n.length; k++) {
            var a = n[k].innerHTML;
            if (a && 1 == n[k].childNodes.length && "#text" == n[k].childNodes[0].nodeName && (e || (a = a.toLowerCase(),
            A = A.toLowerCase()),
            a.indexOf(A) >= 0)) {
                if (t && !this.isWholeWord(a, A))
                    continue;
                var r = document.createElement("div");
                r.ownerElement = n[k],
                r.className = "stiJsViewerFindLabel",
                r.style.width = n[k].offsetWidth - 4 + "px";
                var l = n[k].offsetHeight - 4;
                r.style.height = l + "px",
                r.style.marginTop = -4 * (this.reportParams.zoom / 100) + "px",
                n[k].insertBefore(r, n[k].childNodes[0]),
                r.setSelected = function(A) {
                    this.isSelected = A,
                    this.style.border = "2px solid " + (A ? "red" : "#8a8a8a")
                }
                ,
                0 == this.controls.findHelper.findLabels.length && r.setSelected(!0),
                this.controls.findHelper.findLabels.push(r)
            }
        }
    }
    this.controls.findHelper.findLabels.length > 0 && this.goToFindedElement(this.controls.findHelper.findLabels[0])
}
,
StiJsViewer.prototype.selectFindLabel = function(A) {
    var e = this.controls.findHelper.findLabels;
    if (0 == e.length)
        return;
    for (var t = 0, o = 0; o < e.length; o++)
        if (e[o].isSelected) {
            e[o].setSelected(!1),
            t = o;
            break
        }
    "Next" == A ? (t++,
    t > e.length - 1 && (t = 0)) : (t--,
    t < 0 && (t = e.length - 1)),
    e[t].setSelected(!0),
    this.goToFindedElement(e[t])
}
,
StiJsViewer.prototype.scrollToPage = function(A) {
    var e = 0;
    for (i = 0; i < A; i++)
        e += this.controls.reportPanel.pages[i].offsetHeight + 20;
    this.options.appearance.scrollbarsMode || (e += this.FindPosY(this.controls.reportPanel, null, !0));
    var t = new Date
      , o = t.getTime() + this.options.scrollDuration;
    this.ShowAnimationForScroll(this.controls.reportPanel, e, o)
}
,
StiJsViewer.prototype.removeBookmarksLabel = function() {
    this.controls.bookmarksLabel && (this.controls.bookmarksLabel.parentElement.removeChild(this.controls.bookmarksLabel),
    this.controls.bookmarksLabel = null)
}
,
StiJsViewer.prototype.getPageFromAnchorElement = function(A) {
    var e = A;
    while (e.parentElement) {
        if (e.className && 0 == e.className.indexOf("stiJsViewerPage"))
            return e;
        e = e.parentElement
    }
    return e
}
,
StiJsViewer.prototype.isContainted = function(A, e) {
    for (var t in A)
        if (e == A[t])
            return !0;
    return !1
}
,
StiJsViewer.prototype.IsTouchDevice = function() {
    return "ontouchstart"in document.documentElement
}
,
StiJsViewer.prototype.SetZoom = function(A) {
    zoomValues = ["25", "50", "75", "100", "150", "200"];
    for (var e = 0; e < zoomValues.length; e++)
        if (zoomValues[e] == this.reportParams.zoom)
            break;
    A && e < zoomValues.length - 1 && this.postAction("Zoom" + zoomValues[e + 1]),
    !A && e > 0 && this.postAction("Zoom" + zoomValues[e - 1])
}
,
StiJsViewer.prototype.getCssParameter = function(A) {
    if (A.indexOf(".gif]") > 0 || A.indexOf(".png]") > 0)
        return A.substr(A.indexOf("["), A.indexOf("]") - A.indexOf("[") + 1);
    return null
}
,
StiJsViewer.prototype.newGuid = function() {
    var A = "0123456789abcdefghijklmnopqrstuvwxyz".split("");
    return function(e, t) {
        var o = A
          , i = []
          , s = Math.random;
        if (t = t || o.length,
        e)
            for (var n = 0; n < e; n++)
                i[n] = o[0 | s() * t];
        else {
            var a;
            i[8] = i[13] = i[18] = i[23] = "-",
            i[14] = "4";
            for (var n = 0; n < 36; n++)
                i[n] || (a = 0 | 16 * s(),
                i[n] = o[19 == n ? 3 & a | 8 : 15 & a])
        }
        return i.join("")
    }
}(),
StiJsViewer.prototype.generateKey = function() {
    return this.newGuid().replace(/-/g, "")
}
,
StiJsViewer.prototype.Item = function(A, e, t, o) {
    var i = {
        name: A,
        caption: e,
        imageName: t,
        key: o
    };
    return i
}
,
StiJsViewer.prototype.StrToInt = function(A) {
    var e = parseInt(A);
    if (e)
        return e;
    return 0
}
,
StiJsViewer.prototype.formatDate = function(A, e) {
    var t = A.getFullYear()
      , o = t.toString().substring(2)
      , i = A.getMonth() + 1
      , s = i < 10 ? "0" + i : i
      , n = A.getDate()
      , a = n < 10 ? "0" + n : n
      , r = A.getHours()
      , l = r < 10 ? "0" + r : r
      , c = A.getMinutes()
      , p = c < 10 ? "0" + c : c
      , h = A.getSeconds()
      , g = h < 10 ? "0" + h : h;
    return e = e.replace(/yyyy/i, t),
    e = e.replace(/yy/i, o),
    e = e.replace(/mm/i, s),
    e = e.replace(/m/i, i),
    e = e.replace(/dd/i, a),
    e = e.replace(/d/i, n),
    e = e.replace(/hh/i, l),
    e = e.replace(/h/i, r),
    e = e.replace(/nn/i, p),
    e = e.replace(/n/i, c),
    e = e.replace(/ss/i, g),
    e = e.replace(/s/i, h)
}
,
StiJsViewer.prototype.stringToTime = function(A) {
    var e = A.split(":")
      , t = {
        hours: 0,
        minutes: 0,
        seconds: 0
    };
    return t.hours = this.StrToInt(e[0]),
    e.length > 1 && (t.minutes = this.StrToInt(e[1])),
    e.length > 2 && (t.seconds = this.StrToInt(e[2])),
    t.hours < 0 && (t.hours = 0),
    t.minutes < 0 && (t.minutes = 0),
    t.seconds < 0 && (t.seconds = 0),
    t.hours > 23 && (t.hours = 23),
    t.minutes > 59 && (t.minutes = 59),
    t.seconds > 59 && (t.seconds = 59),
    t
}
,
StiJsViewer.prototype.dateTimeObjectToString = function(A, e) {
    var t = new Date(A.year,A.month - 1,A.day,A.hours,A.minutes,A.seconds);
    if ("" != this.options.appearance.parametersPanelDateFormat)
        return this.formatDate(t, this.options.appearance.parametersPanelDateFormat);
    return this.DateToLocaleString(t, e)
}
,
StiJsViewer.prototype.getStringKey = function(A, e) {
    var t = "DateTime" == e.params.type ? this.dateTimeObjectToString(A, e.params.dateTimeType) : A;
    return t
}
,
StiJsViewer.prototype.getCountObjects = function(A) {
    var e = 0;
    if (A)
        for (var t in A)
            e++;
    return e
}
,
StiJsViewer.prototype.getNowDateTimeObject = function(A) {
    return A || (A = new Date),
    dateTimeObject = {},
    dateTimeObject.year = A.getFullYear(),
    dateTimeObject.month = A.getMonth() + 1,
    dateTimeObject.day = A.getDate(),
    dateTimeObject.hours = A.getHours(),
    dateTimeObject.minutes = A.getMinutes(),
    dateTimeObject.seconds = A.getSeconds(),
    dateTimeObject
}
,
StiJsViewer.prototype.getNowTimeSpanObject = function() {
    return date = new Date,
    timeSpanObject = {},
    timeSpanObject.hours = date.getHours(),
    timeSpanObject.minutes = date.getMinutes(),
    timeSpanObject.seconds = date.getSeconds(),
    timeSpanObject
}
,
StiJsViewer.prototype.copyObject = function(A) {
    if (!A || "object" != typeof A)
        return A;
    var e = "function" == typeof A.pop ? [] : {}, t, o;
    for (t in A)
        A.hasOwnProperty(t) && (o = A[t],
        o && "object" == typeof o ? e[t] = this.copyObject(o) : e[t] = o);
    return e
}
,
StiJsViewer.prototype.getNavigatorName = function() {
    var A = navigator.userAgent
      , e = "Unknown";
    return A.indexOf("MSIE") != -1 ? e = "MSIE" : A.indexOf("Gecko") != -1 ? e = A.indexOf("Chrome") != -1 ? "Google Chrome" : "Mozilla" : A.indexOf("Mozilla") != -1 ? e = "old Netscape or Mozilla" : A.indexOf("Opera") != -1 && (e = "Opera"),
    e
}
,
StiJsViewer.prototype.showHelpWindow = function(A) {
    var e;
    switch (this.options.cultureName) {
    case "ru":
        e = "ru";
    default:
        e = "en"
    }
    this.openNewWindow("http://www.stimulsoft.com/" + e + "/documentation/online/" + A)
}
,
StiJsViewer.prototype.setObjectToCenter = function(A, e) {
    var t = this.controls.viewer.offsetWidth / 2 - A.offsetWidth / 2
      , o = this.options.appearance.fullScreenMode ? this.controls.viewer.offsetHeight / 2 - A.offsetHeight / 2 : e ? e : 250;
    A.style.left = t > 0 ? t + "px" : 0,
    A.style.top = o > 0 ? o + "px" : 0
}
,
StiJsViewer.prototype.strToInt = function(A) {
    var e = parseInt(A);
    if (e)
        return e;
    return 0
}
,
StiJsViewer.prototype.strToCorrectPositiveInt = function(A) {
    var e = this.strToInt(A);
    if (e >= 0)
        return e;
    return 0
}
,
StiJsViewer.prototype.helpLinks = {
    Print: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    Save: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    SendEmail: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    Bookmarks: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    Parameters: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    FirstPage: "user-manual/index.html?report_internals_appearance_borders_simple_borders.htm",
    PrevPage: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    NextPage: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    LastPage: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    FullScreen: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    Zoom: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    ViewMode: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm",
    Editor: "user-manual/index.html?viewing_reports_basic_toolbar_of_report_viewer.htm"
},
StiJsViewer.prototype.getHTMLColor = function(A) {
    if (A.indexOf(",") > 0)
        return "rgb(" + A + ")";
    return A
}
,
StiJsViewer.prototype.clearStyles = function(A) {
    A.className = "stiJsViewerClearAllStyles"
}
,
StiJsViewer.prototype.getDefaultExportSettings = function(A) {
    var e = null;
    switch (A) {
    case "Document":
        e = {};
        break;
    case "Pdf":
        e = this.options.exports.defaultSettings.StiPdfExportSettings;
        break;
    case "Xps":
        e = this.options.exports.defaultSettings.StiXpsExportSettings;
        break;
    case "Ppt2007":
        e = this.options.exports.defaultSettings.StiPpt2007ExportSettings;
        break;
    case "Html":
    case "Html5":
    case "Mht":
        e = this.options.exports.defaultSettings.StiHtmlExportSettings;
        break;
    case "Text":
        e = this.options.exports.defaultSettings.StiTxtExportSettings;
        break;
    case "Rtf":
        e = this.options.exports.defaultSettings.StiRtfExportSettings;
        break;
    case "Word2007":
        e = this.options.exports.defaultSettings.StiWord2007ExportSettings;
        break;
    case "Odt":
        e = this.options.exports.defaultSettings.StiOdtExportSettings;
        break;
    case "Excel":
    case "ExcelXml":
    case "Excel2007":
        e = this.options.exports.defaultSettings.StiExcelExportSettings;
        break;
    case "Ods":
        e = this.options.exports.defaultSettings.StiOdsExportSettings;
        break;
    case "ImageBmp":
    case "ImageGif":
    case "ImageJpeg":
    case "ImagePcx":
    case "ImagePng":
    case "ImageTiff":
    case "ImageSvg":
    case "ImageSvgz":
    case "ImageEmf":
        e = this.options.exports.defaultSettings.StiImageExportSettings;
        break;
    case "Xml":
    case "Csv":
    case "Dbf":
    case "Dif":
    case "Sylk":
        e = this.options.exports.defaultSettings.StiDataExportSettings
    }
    return e
}
,
StiJsViewer.prototype.changeFullScreenMode = function(A) {
    this.options.appearance.scrollbarsMode = A || this.options.appearance.userScrollbarsMode,
    this.options.appearance.fullScreenMode = A,
    this.options.toolbar.visible && this.options.toolbar.showFullScreenButton && this.controls.toolbar.controls.FullScreen.setSelected(A),
    A ? (this.controls.viewer.style.zIndex = "1000000",
    this.controls.viewer.style.position = "absolute",
    this.controls.viewer.style.width && (this.controls.viewer.style.userWidth = this.controls.viewer.style.width,
    this.controls.viewer.style.width = null),
    this.controls.viewer.style.height && (this.controls.viewer.style.userHeight = this.controls.viewer.style.height,
    this.controls.viewer.style.height = null),
    this.controls.reportPanel.style.position = "absolute",
    this.controls.reportPanel.style.top = this.options.toolbar.visible ? this.controls.toolbar.offsetHeight + "px" : 0,
    document.body.prevOverflow = document.body.style.overflow,
    document.body.style.overflow = "hidden") : (this.controls.viewer.style.zIndex = "auto",
    this.controls.viewer.style.position = "",
    this.controls.viewer.style.userWidth && (this.controls.viewer.style.width = this.controls.viewer.style.userWidth),
    this.controls.viewer.style.userHeight && (this.controls.viewer.style.height = this.controls.viewer.style.userHeight),
    this.controls.reportPanel.style.position = "Percentage" != this.options.viewerHeightType || this.options.appearance.scrollbarsMode ? "absolute" : "relative",
    this.controls.reportPanel.style.top = this.options.toolbar.visible && ("Percentage" != this.options.viewerHeightType || this.options.appearance.scrollbarsMode) ? this.controls.toolbar.offsetHeight + "px" : 0,
    "undefined" != typeof document.body.prevOverflow && (document.body.style.overflow = document.body.prevOverflow,
    delete document.body.prevOverflow)),
    this.controls.reportPanel.style.overflow = this.options.appearance.scrollbarsMode ? "auto" : "hidden"
}
,
StiJsViewer.prototype.addEvent = function(A, e, t) {
    A.addEventListener ? A.addEventListener(e, t, !1) : A.attachEvent && A.attachEvent("on" + e, t)
}
,
StiJsViewer.prototype.lowerFirstChar = function(A) {
    return A.charAt(0).toLowerCase() + A.substr(1)
}
,
StiJsViewer.prototype.addHoverEventsToMenus = function() {
    if ("Hover" == this.options.toolbar.showMenuMode)
        for (var A = ["Print", "Save", "SendEmail", "Zoom", "ViewMode"], e = 0; e < A.length; e++) {
            var t = this.controls.toolbar.controls[A[e]];
            if (t) {
                var o = this.controls.menus[this.lowerFirstChar(t.name) + "Menu"];
                o && (o.buttonName = t.name,
                o.onmouseover = function() {
                    clearTimeout(this.jsObject.options.toolbar["hideTimer" + this.buttonName + "Menu"])
                }
                ,
                o.onmouseout = function() {
                    var A = this;
                    this.jsObject.options.toolbar["hideTimer" + this.buttonName + "Menu"] = setTimeout(function() {
                        A.changeVisibleState(!1)
                    }, this.jsObject.options.menuHideDelay)
                }
                )
            }
        }
}
,
StiJsViewer.prototype.GetXmlValue = function(A, e) {
    var t = A.substr(0, A.indexOf("</" + e + ">"));
    return t.substr(A.indexOf("<" + e + ">") + e.length + 2)
}
,
StiJsViewer.prototype.DateToLocaleString = function(A, e) {
    var t = A.toLocaleTimeString()
      , o = t.toLowerCase().indexOf("am") >= 0 || t.toLowerCase().indexOf("pm") >= 0
      , i = o ? "MM/dd/yyyy" : "dd.MM.yyyy"
      , s = A.getFullYear()
      , n = s.toString().substring(2)
      , a = A.getMonth() + 1
      , r = a < 10 ? "0" + a : a
      , l = A.getDate()
      , c = l < 10 ? "0" + l : l;
    if (i = i.replace(/yyyy/i, s),
    i = i.replace(/yy/i, n),
    i = i.replace(/MM/i, r),
    i = i.replace(/M/i, a),
    i = i.replace(/dd/i, c),
    i = i.replace(/d/i, l),
    "Time" == e)
        return t;
    if ("Date" == e)
        return i;
    return i + " " + t
}
,
StiJsViewer.prototype.UpdateAllHyperLinks = function() {
    if ("WholeReport" == this.reportParams.viewMode)
        return;
    var aHyperlinks = this.controls.reportPanel.getElementsByTagName("a");
    if (this.controls.bookmarksPanel)
        for (var aBookmarks = this.controls.bookmarksPanel.getElementsByTagName("a"), i = 0; i < aHyperlinks.length; i++)
            aHyperlinks[i].getAttribute("href") && (aHyperlinks[i].anchorName = aHyperlinks[i].getAttribute("href").replace("#", ""),
            aHyperlinks[i].onclick = function() {
                for (var k = 0; k < aBookmarks.length; k++) {
                    var clickFunc = aBookmarks[k].getAttribute("onclick");
                    if (clickFunc && clickFunc.indexOf("'" + this.anchorName + "'") > 0)
                        try {
                            return eval(clickFunc),
                            !1
                        } catch (A) {}
                }
            }
            )
}
,
StiJsViewer.prototype.openNewWindow = function(A) {
    var e = window.open(A);
    return e
}
,
StiJsViewer.prototype.SetCookie = function(A, e, t, o, i) {
    var s = location.pathname
      , n = new Date;
    n.setTime(n.getTime() + 365 * 24 * 3600 * 1e3),
    document.cookie = A + "=" + escape(e) + "; expires=" + n.toGMTString() + (t ? "; path=" + t : "") + (o ? "; domain=" + s.substring(0, s.lastIndexOf("/")) + "/" : "") + (i ? "; secure" : "")
}
,
StiJsViewer.prototype.GetCookie = function(A) {
    var e = " " + document.cookie
      , t = " " + A + "="
      , o = null
      , i = 0
      , s = 0;
    return e.length > 0 && (i = e.indexOf(t),
    i != -1 && (i += t.length,
    s = e.indexOf(";", i),
    s == -1 && (s = e.length),
    o = unescape(e.substring(i, s)))),
    o
}
,
StiJsViewer.prototype.GetImageTypesItems = function() {
    var A = [];
    return this.options.exports.showExportToImageBmp && A.push(this.Item("Bmp", "Bmp", null, "Bmp")),
    this.options.exports.showExportToImageGif && A.push(this.Item("Gif", "Gif", null, "Gif")),
    this.options.exports.showExportToImageJpeg && A.push(this.Item("Jpeg", "Jpeg", null, "Jpeg")),
    this.options.exports.showExportToImagePcx && A.push(this.Item("Pcx", "Pcx", null, "Pcx")),
    this.options.exports.showExportToImagePng && A.push(this.Item("Png", "Png", null, "Png")),
    this.options.exports.showExportToImageTiff && A.push(this.Item("Tiff", "Tiff", null, "Tiff")),
    this.options.exports.showExportToImageMetafile && A.push(this.Item("Emf", "Emf", null, "Emf")),
    this.options.exports.showExportToImageSvg && A.push(this.Item("Svg", "Svg", null, "Svg")),
    this.options.exports.showExportToImageSvgz && A.push(this.Item("Svgz", "Svgz", null, "Svgz")),
    A
}
,
StiJsViewer.prototype.GetDataTypesItems = function() {
    var A = [];
    return this.options.exports.showExportToCsv && A.push(this.Item("Csv", "Csv", null, "Csv")),
    this.options.exports.showExportToDbf && A.push(this.Item("Dbf", "Dbf", null, "Dbf")),
    this.options.exports.showExportToXml && A.push(this.Item("Xml", "Xml", null, "Xml")),
    this.options.exports.showExportToDif && A.push(this.Item("Dif", "Dif", null, "Dif")),
    this.options.exports.showExportToSylk && A.push(this.Item("Sylk", "Sylk", null, "Sylk")),
    A
}
,
StiJsViewer.prototype.GetExcelTypesItems = function() {
    var A = [];
    return this.options.exports.showExportToExcel2007 && A.push(this.Item("Excel2007", "Excel", null, "Excel2007")),
    this.options.exports.showExportToExcel && A.push(this.Item("ExcelBinary", "Excel 97-2003", null, "ExcelBinary")),
    this.options.exports.showExportToExcelXml && A.push(this.Item("ExcelXml", "Excel Xml 2003", null, "ExcelXml")),
    A
}
,
StiJsViewer.prototype.GetHtmlTypesItems = function() {
    var A = [];
    return this.options.exports.showExportToHtml && A.push(this.Item("Html", "Html", null, "Html")),
    this.options.exports.showExportToHtml5 && A.push(this.Item("Html5", "Html5", null, "Html5")),
    this.options.exports.showExportToMht && A.push(this.Item("Mht", "Mht", null, "Mht")),
    A
}
,
StiJsViewer.prototype.GetZoomItems = function() {
    for (var A = [], e = [.25, .5, .75, 1, 1.25, 1.5, 2], t = 0; t < e.length; t++)
        A.push(this.Item("item" + t, 100 * e[t] + "%", null, e[t].toString()));
    return A
}
,
StiJsViewer.prototype.GetImageFormatForHtmlItems = function() {
    var A = [];
    return A.push(this.Item("item0", "Jpeg", null, "Jpeg")),
    A.push(this.Item("item1", "Gif", null, "Gif")),
    A.push(this.Item("item2", "Bmp", null, "Bmp")),
    A.push(this.Item("item3", "Png", null, "Png")),
    A
}
,
StiJsViewer.prototype.GetExportModeItems = function() {
    var A = [];
    return A.push(this.Item("item0", "Table", null, "Table")),
    A.push(this.Item("item1", "Span", null, "Span")),
    A.push(this.Item("item2", "Div", null, "Div")),
    A
}
,
StiJsViewer.prototype.GetImageResolutionItems = function() {
    for (var A = [], e = ["10", "25", "50", "75", "100", "200", "300", "400", "500"], t = 0; t < e.length; t++)
        A.push(this.Item("item" + t, e[t], null, e[t]));
    return A
}
,
StiJsViewer.prototype.GetImageCompressionMethodItems = function() {
    var A = [];
    return A.push(this.Item("item0", "Jpeg", null, "Jpeg")),
    A.push(this.Item("item1", "Flate", null, "Flate")),
    A
}
,
StiJsViewer.prototype.GetImageQualityItems = function() {
    for (var A = [], e = [.25, .5, .75, .85, .9, .95, 1], t = 0; t < e.length; t++)
        A.push(this.Item("item" + t, 100 * e[t] + "%", null, e[t].toString()));
    return A
}
,
StiJsViewer.prototype.GetBorderTypeItems = function() {
    var A = [];
    return A.push(this.Item("item0", this.collections.loc.BorderTypeSimple, null, "Simple")),
    A.push(this.Item("item1", this.collections.loc.BorderTypeSingle, null, "UnicodeSingle")),
    A.push(this.Item("item2", this.collections.loc.BorderTypeDouble, null, "UnicodeDouble")),
    A
}
,
StiJsViewer.prototype.GetEncodingDataItems = function() {
    for (var A = [], e = 0; e < this.collections.encodingData.length; e++) {
        var t = this.collections.encodingData[e];
        A.push(this.Item("item" + e, t.value, null, t.key))
    }
    return A
}
,
StiJsViewer.prototype.GetImageFormatItems = function(A) {
    var e = [];
    return e.push(this.Item("item0", this.collections.loc.ImageFormatColor, null, "Color")),
    e.push(this.Item("item1", this.collections.loc.ImageFormatGrayscale, null, "Grayscale")),
    A || e.push(this.Item("item2", this.collections.loc.ImageFormatMonochrome, null, "Monochrome")),
    e
}
,
StiJsViewer.prototype.GetMonochromeDitheringTypeItems = function() {
    var A = [];
    return A.push(this.Item("item0", "None", null, "None")),
    A.push(this.Item("item1", "FloydSteinberg", null, "FloydSteinberg")),
    A.push(this.Item("item2", "Ordered", null, "Ordered")),
    A
}
,
StiJsViewer.prototype.GetTiffCompressionSchemeItems = function() {
    var A = [];
    return A.push(this.Item("item0", "Default", null, "Default")),
    A.push(this.Item("item1", "CCITT3", null, "CCITT3")),
    A.push(this.Item("item2", "CCITT4", null, "CCITT4")),
    A.push(this.Item("item3", "LZW", null, "LZW")),
    A.push(this.Item("item4", "None", null, "None")),
    A.push(this.Item("item5", "Rle", null, "Rle")),
    A
}
,
StiJsViewer.prototype.GetEncodingDifFileItems = function() {
    var A = [];
    return A.push(this.Item("item0", "437", null, "437")),
    A.push(this.Item("item1", "850", null, "850")),
    A.push(this.Item("item2", "852", null, "852")),
    A.push(this.Item("item3", "857", null, "857")),
    A.push(this.Item("item4", "860", null, "860")),
    A.push(this.Item("item5", "861", null, "861")),
    A.push(this.Item("item6", "862", null, "862")),
    A.push(this.Item("item7", "863", null, "863")),
    A.push(this.Item("item8", "865", null, "865")),
    A.push(this.Item("item9", "866", null, "866")),
    A.push(this.Item("item10", "869", null, "869")),
    A
}
,
StiJsViewer.prototype.GetExportModeRtfItems = function() {
    var A = [];
    return A.push(this.Item("item0", this.collections.loc.ExportModeRtfTable, null, "Table")),
    A.push(this.Item("item1", this.collections.loc.ExportModeRtfFrame, null, "Frame")),
    A
}
,
StiJsViewer.prototype.GetEncodingDbfFileItems = function() {
    var A = [];
    return A.push(this.Item("item0", "Default", null, "Default")),
    A.push(this.Item("item1", "437 U.S. MS-DOS", null, "USDOS")),
    A.push(this.Item("item2", "620 Mazovia(Polish) MS-DOS", null, "MazoviaDOS")),
    A.push(this.Item("item3", "737 Greek MS-DOS(437G)", null, "GreekDOS")),
    A.push(this.Item("item4", "850 International MS-DOS", null, "InternationalDOS")),
    A.push(this.Item("item5", "852 Eastern European MS-DOS", null, "EasternEuropeanDOS")),
    A.push(this.Item("item6", "857 Turkish MS-DOS", null, "TurkishDOS")),
    A.push(this.Item("item7", "861 Icelandic MS-DOS", null, "IcelandicDOS")),
    A.push(this.Item("item8", "865 Nordic MS-DOS", null, "NordicDOS")),
    A.push(this.Item("item9", "866 Russian MS-DOS", null, "RussianDOS")),
    A.push(this.Item("item10", "895 Kamenicky(Czech) MS-DOS", null, "KamenickyDOS")),
    A.push(this.Item("item11", "1250 Eastern European Windows", null, "EasternEuropeanWindows")),
    A.push(this.Item("item12", "1251 Russian Windows", null, "RussianWindows")),
    A.push(this.Item("item13", "1252 WindowsANSI", null, "WindowsANSI")),
    A.push(this.Item("item14", "1253 GreekWindows", null, "GreekWindows")),
    A.push(this.Item("item15", "1254 TurkishWindows", null, "TurkishWindows")),
    A.push(this.Item("item16", "10000 StandardMacintosh", null, "StandardMacintosh")),
    A.push(this.Item("item17", "10006 GreekMacintosh", null, "GreekMacintosh")),
    A.push(this.Item("item18", "10007 RussianMacintosh", null, "RussianMacintosh")),
    A.push(this.Item("item19", "10029 EasternEuropeanMacintosh", null, "EasternEuropeanMacintosh")),
    A
}
,
StiJsViewer.prototype.GetAllowEditableItems = function() {
    var A = [];
    return A.push(this.Item("item0", this.collections.loc.NameYes, null, "Yes")),
    A.push(this.Item("item1", this.collections.loc.NameNo, null, "No")),
    A
}
,
StiJsViewer.prototype.GetEncryptionKeyLengthItems = function() {
    var A = [];
    return A.push(this.Item("item0", "40 bit", null, "Bit40")),
    A.push(this.Item("item1", "128 bit", null, "Bit128")),
    A
}
,
StiJsViewer.prototype.GetDataExportModeItems = function() {
    var A = [];
    return A.push(this.Item("item0", this.collections.loc.BandsFilterAllBands, null, "AllBands")),
    A.push(this.Item("item1", this.collections.loc.BandsFilterDataOnly, null, "Data")),
    A.push(this.Item("item2", this.collections.loc.BandsFilterDataAndHeadersFooters, null, "DataAndHeadersFooters")),
    A
}
;
var hexcase = 0;
StiJsViewer.prototype.InitializeAboutPanel = function() {
    var A = document.createElement("div");
    this.controls.aboutPanel = A,
    this.controls.mainPanel.appendChild(A),
    A.jsObject = this,
    A.className = "stiJsViewerAboutPanel",
    A.style.background = "white url(" + this.collections.images["AboutInfo.png"] + ")",
    A.style.display = "none";
    var e = document.createElement("div");
    e.innerHTML = this.collections.loc.Version + ": " + this.options.productVersion,
    A.appendChild(e),
    e.style.fontFamily = "Arial",
    e.style.fontSize = "10pt",
    e.style.color = "#000000",
    e.style.padding = "60px 20px 5px 25px";
    var t = document.createElement("div");
    t.innerHTML = "Copyright 2003-" + (new Date).getFullYear() + " by Stimulsoft, All rights reserved.",
    A.appendChild(t),
    t.style.fontFamily = "Arial",
    t.style.fontSize = "10pt",
    t.style.color = "#000000",
    t.style.padding = "118px 20px 0px 25px",
    A.ontouchstart = function() {
        this.changeVisibleState(!1)
    }
    ,
    A.onmousedown = function() {
        this.changeVisibleState(!1)
    }
    ,
    A.changeVisibleState = function(A) {
        this.style.display = A ? "" : "none",
        this.jsObject.setObjectToCenter(this),
        this.jsObject.controls.disabledPanels[2].changeVisibleState(A)
    }
}
,
StiJsViewer.prototype.InitializeBookmarksPanel = function() {
    var createAndShow = !0;
    if (this.controls.bookmarksPanel && (this.controls.bookmarksPanel.visible || (createAndShow = !1),
    this.controls.bookmarksPanel.changeVisibleState(!1),
    this.controls.mainPanel.removeChild(this.controls.bookmarksPanel),
    delete this.controls.bookmarksPanel),
    this.options.toolbar.visible && this.options.toolbar.showBookmarksButton && this.controls.toolbar.controls.Bookmarks.setEnabled(null != this.reportParams.bookmarksContent),
    !this.reportParams.bookmarksContent)
        return;
    var bookmarksPanel = document.createElement("div");
    this.controls.mainPanel.appendChild(bookmarksPanel),
    this.controls.bookmarksPanel = bookmarksPanel,
    bookmarksPanel.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (bookmarksPanel.style.color = this.options.toolbar.fontColor),
    bookmarksPanel.jsObject = this,
    bookmarksPanel.id = this.controls.viewer.id + "_BookmarksPanel",
    bookmarksPanel.className = "stiJsViewerBookmarksPanel",
    bookmarksPanel.style.display = "none",
    bookmarksPanel.visible = !1,
    bookmarksPanel.style.width = this.options.appearance.bookmarksTreeWidth - 1 + "px",
    bookmarksPanel.style.top = (this.options.toolbar.visible ? this.controls.toolbar.offsetHeight + 2 : 2) + (this.controls.parametersPanel ? this.controls.parametersPanel.offsetHeight - 2 : 0) + (this.controls.findPanel ? this.controls.findPanel.offsetHeight : 0) + this.controls.drillDownPanel.offsetHeight + "px",
    bookmarksPanel.style.bottom = "2px",
    bookmarksPanel.container = document.createElement("div"),
    bookmarksPanel.container.className = "stiJsViewerBookmarksContainer",
    "" != this.options.toolbar.backgroundColor && (bookmarksPanel.container.style.background = this.options.toolbar.backgroundColor),
    "" != this.options.toolbar.borderColor && (bookmarksPanel.container.style.border = "1px solid " + this.options.toolbar.borderColor),
    bookmarksPanel.appendChild(bookmarksPanel.container),
    bookmarksPanel.changeVisibleState = function(A) {
        var e = this.jsObject.options;
        this.style.display = A ? "" : "none",
        this.visible = A,
        e.toolbar.visible && e.toolbar.showBookmarksButton && this.jsObject.controls.toolbar.controls.Bookmarks.setSelected(A),
        this.jsObject.controls.reportPanel.style.marginLeft = A ? this.jsObject.options.appearance.bookmarksTreeWidth + 2 + "px" : 0
    }
    ,
    bookmarksPanel.addContent = function(A) {
        this.container.innerHTML = A
    }
    ;
    var imagesForBookmarks = this.GetImagesForBookmarks()
      , bookmarksContent = this.reportParams.bookmarksContent.replace("imagesForBookmarks", imagesForBookmarks);
    eval(bookmarksContent),
    bookmarksPanel.addContent(bookmarks),
    createAndShow && bookmarksPanel.changeVisibleState(!0)
}
,
StiJsViewer.prototype.GetImagesForBookmarks = function() {
    for (var A = ["root", "folder", "folderOpen", "node", "empty", "line", "join", "joinBottom", "plus", "plusBottom", "minus", "minusBottom"], e = {}, t = 0; t < A.length; t++)
        e[A[t]] = this.collections.images["Bookmarks" + A[t] + ".png"];
    return JSON.stringify(e)
}
,
stiTree.prototype.add = function(A, e, t, o, i, s) {
    this.aNodes[this.aNodes.length] = new stiTreeNode(A,e,t,o,i,s)
}
,
stiTree.prototype.openAll = function() {
    this.oAll(!0)
}
,
stiTree.prototype.closeAll = function() {
    this.oAll(!1)
}
,
stiTree.prototype.toString = function() {
    var A = '<div class="stiTree">\n';
    return document.getElementById ? (this.config.useCookies && (this.selectedNode = this.getSelected()),
    A += this.addNode(this.root)) : A += "Browser not supported.",
    A += "</div>",
    this.selectedFound || (this.selectedNode = null),
    this.completed = !0,
    A
}
,
stiTree.prototype.addNode = function(A) {
    var e = ""
      , t = 0;
    for (this.config.inOrder && (t = A._ai),
    t; t < this.aNodes.length; t++)
        if (this.aNodes[t].pid == A.id) {
            var o = this.aNodes[t];
            if (o._p = A,
            o._ai = t,
            this.setCS(o),
            !o.target && this.config.target && (o.target = this.config.target),
            o._hc && !o._io && this.config.useCookies && (o._io = this.isOpen(o.id)),
            !this.config.folderLinks && o._hc && (o.url = null),
            this.config.useSelection && o.id == this.selectedNode && !this.selectedFound && (o._is = !0,
            this.selectedNode = t,
            this.selectedFound = !0),
            e += this.node(o, t),
            o._ls)
                break
        }
    return e
}
,
stiTree.prototype.node = function(A, e) {
    var t = '<div class="stiTreeNode">' + this.indent(A, e);
    if (this.config.useIcons && (A.icon || (A.icon = this.root.id == A.pid ? this.icon.root : A._hc ? this.icon.folder : this.icon.node),
    A.iconOpen || (A.iconOpen = A._hc ? this.icon.folderOpen : this.icon.node),
    this.root.id == A.pid && (A.icon = this.icon.root,
    A.iconOpen = this.icon.root),
    t += '<img id="i' + this.obj + e + '" src="' + (A._io ? A.iconOpen : A.icon) + '" alt="" />'),
    A.url) {
        t += '<a id="s' + this.obj + e + '" class="' + (this.config.useSelection && A._is ? "nodeSel" : "node") + '"',
        A.target && (t += ' target="' + A.target + '"'),
        this.config.useStatusText && (t += " onmouseover=\"window.status='" + A.name + "';return true;\" onmouseout=\"window.status='';return true;\" ");
        var o = "";
        this.config.useSelection && (A._hc && this.config.folderLinks || !A._hc) && (o += this.obj + ".s(" + e + ");"),
        null != A.page && (o += "document.getElementById('" + this.mobileViewerId + "').jsObject.postAction('BookmarkAction'," + A.page + ",'" + A.url.substr(1) + "');"),
        o.length > 0 && A.page >= 0 && (t += ' onclick="' + o + '"'),
        t += ">"
    } else
        this.config.folderLinks && A.url || !A._hc || A.pid == this.root.id || (t += '<a href="javascript: ' + this.obj + ".o(" + e + ');" class="node">');
    return t += A.name,
    !A.url && (this.config.folderLinks && A.url || !A._hc) || (t += "</a>"),
    t += "</div>",
    A._hc && (t += '<div id="d' + this.obj + e + '" class="clip" style="display:' + (this.root.id == A.pid || A._io ? "block" : "none") + ';">',
    t += this.addNode(A),
    t += "</div>"),
    this.aIndent.pop(),
    t
}
,
stiTree.prototype.indent = function(A, e) {
    var t = "";
    if (this.root.id != A.pid) {
        for (var o = 0; o < this.aIndent.length; o++)
            t += '<img src="' + (1 == this.aIndent[o] && this.config.useLines ? this.icon.line : this.icon.empty) + '" alt="" />';
        A._ls ? this.aIndent.push(0) : this.aIndent.push(1),
        A._hc ? (t += '<a href="javascript: ' + this.obj + ".o(" + e + ');"><img id="j' + this.obj + e + '" src="',
        t += this.config.useLines ? A._io ? A._ls && this.config.useLines ? this.icon.minusBottom : this.icon.minus : A._ls && this.config.useLines ? this.icon.plusBottom : this.icon.plus : A._io ? this.icon.nlMinus : this.icon.nlPlus,
        t += '" alt="" /></a>') : t += '<img src="' + (this.config.useLines ? A._ls ? this.icon.joinBottom : this.icon.join : this.icon.empty) + '" alt="" />'
    }
    return t
}
,
stiTree.prototype.setCS = function(A) {
    for (var e, t = 0; t < this.aNodes.length; t++)
        this.aNodes[t].pid == A.id && (A._hc = !0),
        this.aNodes[t].pid == A.pid && (e = this.aNodes[t].id);
    e == A.id && (A._ls = !0)
}
,
stiTree.prototype.getSelected = function() {
    var A = this.getCookie("cs" + this.obj);
    return A ? A : null
}
,
stiTree.prototype.s = function(A) {
    if (!this.config.useSelection)
        return;
    var e = this.aNodes[A];
    if (e._hc && !this.config.folderLinks)
        return;
    this.selectedNode != A && ((this.selectedNode || 0 == this.selectedNode) && (eOld = document.getElementById("s" + this.obj + this.selectedNode),
    eOld.className = "node"),
    eNew = document.getElementById("s" + this.obj + A),
    eNew.className = "nodeSel",
    this.selectedNode = A,
    this.config.useCookies && this.setCookie("cs" + this.obj, e.id))
}
,
stiTree.prototype.o = function(A) {
    var e = this.aNodes[A];
    this.nodeStatus(!e._io, A, e._ls),
    e._io = !e._io,
    this.config.closeSameLevel && this.closeLevel(e),
    this.config.useCookies && this.updateCookie();
}
,
stiTree.prototype.oAll = function(A) {
    for (var e = 0; e < this.aNodes.length; e++)
        this.aNodes[e]._hc && this.aNodes[e].pid != this.root.id && (this.nodeStatus(A, e, this.aNodes[e]._ls),
        this.aNodes[e]._io = A);
    this.config.useCookies && this.updateCookie()
}
,
stiTree.prototype.openTo = function(A, e, t) {
    if (!t)
        for (var o = 0; o < this.aNodes.length; o++)
            if (this.aNodes[o].id == A) {
                A = o;
                break
            }
    var i = this.aNodes[A];
    if (i.pid == this.root.id || !i._p)
        return;
    i._io = !0,
    i._is = e,
    this.completed && i._hc && this.nodeStatus(!0, i._ai, i._ls),
    this.completed && e ? this.s(i._ai) : e && (this._sn = i._ai),
    this.openTo(i._p._ai, !1, !0)
}
,
stiTree.prototype.closeLevel = function(A) {
    for (var e = 0; e < this.aNodes.length; e++)
        this.aNodes[e].pid == A.pid && this.aNodes[e].id != A.id && this.aNodes[e]._hc && (this.nodeStatus(!1, e, this.aNodes[e]._ls),
        this.aNodes[e]._io = !1,
        this.closeAllChildren(this.aNodes[e]))
}
,
stiTree.prototype.closeAllChildren = function(A) {
    for (var e = 0; e < this.aNodes.length; e++)
        this.aNodes[e].pid == A.id && this.aNodes[e]._hc && (this.aNodes[e]._io && this.nodeStatus(!1, e, this.aNodes[e]._ls),
        this.aNodes[e]._io = !1,
        this.closeAllChildren(this.aNodes[e]))
}
,
stiTree.prototype.nodeStatus = function(A, e, t) {
    eDiv = document.getElementById("d" + this.obj + e),
    eJoin = document.getElementById("j" + this.obj + e),
    this.config.useIcons && (eIcon = document.getElementById("i" + this.obj + e),
    eIcon.src = A ? this.aNodes[e].iconOpen : this.aNodes[e].icon),
    eJoin.src = this.config.useLines ? A ? t ? this.icon.minusBottom : this.icon.minus : t ? this.icon.plusBottom : this.icon.plus : A ? this.icon.nlMinus : this.icon.nlPlus,
    eDiv.style.display = A ? "block" : "none"
}
,
stiTree.prototype.clearCookie = function() {
    var A = new Date
      , e = new Date(A.getTime() - 1e3 * 60 * 60 * 24);
    this.setCookie("co" + this.obj, "cookieValue", e),
    this.setCookie("cs" + this.obj, "cookieValue", e)
}
,
stiTree.prototype.setCookie = function(A, e, t, o, i, s) {
    document.cookie = escape(A) + "=" + escape(e) + (t ? "; expires=" + t.toGMTString() : "") + (o ? "; path=" + o : "") + (i ? "; domain=" + i : "") + (s ? "; secure" : "")
}
,
stiTree.prototype.getCookie = function(A) {
    var e = ""
      , t = document.cookie.indexOf(escape(A) + "=");
    if (t != -1) {
        var o = t + (escape(A) + "=").length
          , i = document.cookie.indexOf(";", o);
        e = i != -1 ? unescape(document.cookie.substring(o, i)) : unescape(document.cookie.substring(o))
    }
    return e
}
,
stiTree.prototype.updateCookie = function() {
    for (var A = "", e = 0; e < this.aNodes.length; e++)
        this.aNodes[e]._io && this.aNodes[e].pid != this.root.id && (A && (A += "."),
        A += this.aNodes[e].id);
    this.setCookie("co" + this.obj, A)
}
,
stiTree.prototype.isOpen = function(A) {
    for (var e = this.getCookie("co" + this.obj).split("."), t = 0; t < e.length; t++)
        if (e[t] == A)
            return !0;
    return !1
}
,
Array.prototype.push || (Array.prototype.push = function A() {
    for (var e = 0; e < arguments.length; e++)
        this[this.length] = arguments[e];
    return this.length
}
),
Array.prototype.pop || (Array.prototype.pop = function A() {
    return lastElement = this[this.length - 1],
    this.length = Math.max(this.length - 1, 0),
    lastElement
}
),
StiJsViewer.prototype.CheckBox = function(A, e, t) {
    var o = this.CreateHTMLTable();
    o.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (o.style.color = this.options.toolbar.fontColor),
    o.jsObject = this,
    o.isEnabled = !0,
    o.isChecked = !1,
    o.id = this.generateKey(),
    o.name = A,
    o.captionText = e,
    t && o.setAttribute("title", t),
    o.className = "stiJsViewerCheckBox",
    o.style.boxSizing = "content-box",
    A && (this.controls.checkBoxes || (this.controls.checkBoxes = {}),
    this.controls.checkBoxes[A] = o),
    o.imageBlock = document.createElement("div");
    var i = this.options.isTouchDevice ? "16px" : "13px";
    o.imageBlock.style.width = i,
    o.imageBlock.style.height = i,
    o.imageBlock.style.boxSizing = "content-box",
    o.imageBlock.className = "stiJsViewerCheckBoxImageBlock";
    var s = o.addCell(o.imageBlock);
    this.options.isTouchDevice && (s.style.padding = "1px 3px 1px 1px"),
    o.image = document.createElement("img"),
    o.image.src = this.collections.images["CheckBox.png"],
    o.image.style.visibility = "hidden",
    o.image.style.verticalAlign = "baseline";
    var n = this.CreateHTMLTable();
    return n.style.width = "100%",
    n.style.height = "100%",
    o.imageBlock.appendChild(n),
    n.addCell(o.image).style.textAlign = "center",
    null != e && (o.captionCell = o.addCell(),
    this.options.isTouchDevice || (o.captionCell.style.padding = "1px 0 0 4px"),
    o.captionCell.style.whiteSpace = "nowrap",
    o.captionCell.innerHTML = e),
    o.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }
    ,
    o.onmouseenter = function() {
        if (!this.isEnabled)
            return;
        this.imageBlock.className = "stiJsViewerCheckBoxImageBlockOver"
    }
    ,
    o.onmouseleave = function() {
        if (!this.isEnabled)
            return;
        this.imageBlock.className = "stiJsViewerCheckBoxImageBlock"
    }
    ,
    o.onclick = function() {
        if (this.isTouchEndFlag || !this.isEnabled || this.jsObject.options.isTouchClick)
            return;
        this.setChecked(!this.isChecked),
        this.action()
    }
    ,
    o.ontouchend = function() {
        if (!this.isEnabled || this.jsObject.options.fingerIsMoved)
            return;
        var A = this;
        this.isTouchEndFlag = !0,
        clearTimeout(this.isTouchEndTimer),
        this.imageBlock.className = "stiJsViewerCheckBoxImageBlockOver",
        setTimeout(function() {
            A.imageBlock.className = "stiJsViewerCheckBoxImageBlock",
            A.setChecked(!A.isChecked),
            A.action()
        }, 150),
        this.isTouchEndTimer = setTimeout(function() {
            A.isTouchEndFlag = !1
        }, 1e3)
    }
    ,
    o.ontouchstart = function() {
        this.jsObject.options.fingerIsMoved = !1
    }
    ,
    o.setEnabled = function(A) {
        this.image.style.opacity = A ? "1" : "0.5",
        this.isEnabled = A,
        this.className = A ? "stiJsViewerCheckBox" : "stiJsViewerCheckBoxDisabled",
        this.imageBlock.className = A ? "stiJsViewerCheckBoxImageBlock" : "stiJsViewerCheckBoxImageBlockDisabled"
    }
    ,
    o.setChecked = function(A) {
        this.image.style.visibility = A ? "visible" : "hidden",
        this.isChecked = A,
        this.onChecked()
    }
    ,
    o.onChecked = function() {}
    ,
    o.action = function() {}
    ,
    o
}
,
StiJsViewer.prototype.InitializeDatePicker = function(A) {
    var e = this.BaseMenu(null, null, "Down", "stiJsViewerDropdownMenu");
    e.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (e.style.color = this.options.toolbar.fontColor),
    e.style.zIndex = "36",
    e.parentDataControl = null,
    e.dayButtons = [],
    e.showTime = !1,
    e.doubleDatePicker = A,
    e.key = new Date,
    A || (this.controls.datePicker = e,
    this.controls.mainPanel.appendChild(e));
    var t = this.CreateHTMLTable();
    e.innerContent.appendChild(t),
    e.prevMonthButton = this.SmallButton(null, null, "ArrowLeft.png"),
    e.prevMonthButton.style.margin = "1px 2px 0 1px",
    e.prevMonthButton.datePicker = e,
    e.prevMonthButton.action = function() {
        var A = this.datePicker.key.getMonth()
          , e = this.datePicker.key.getFullYear();
        A--,
        A == -1 && (A = 11,
        e--);
        var t = this.jsObject.GetCountDaysOfMonth(e, A);
        t < this.datePicker.key.getDate() && this.datePicker.key.setDate(t),
        this.datePicker.key.setMonth(A),
        this.datePicker.key.setYear(e),
        this.datePicker.fill(),
        this.datePicker.action()
    }
    ,
    t.addCell(e.prevMonthButton),
    e.monthDropDownList = this.DropDownList(null, this.options.isTouchDevice ? 79 : 81, null, this.GetMonthesForDatePickerItems(), !0),
    e.monthDropDownList.style.margin = "1px 2px 0 0",
    e.monthDropDownList.datePicker = e,
    e.monthDropDownList.action = function() {
        var A = this.jsObject.GetCountDaysOfMonth(this.datePicker.key.getFullYear(), parseInt(this.key));
        A < this.datePicker.key.getDate() && this.datePicker.key.setDate(A),
        this.datePicker.key.setMonth(parseInt(this.key)),
        this.datePicker.repaintDays(),
        this.datePicker.action()
    }
    ,
    t.addCell(e.monthDropDownList),
    e.monthDropDownList.menu.style.zIndex = "37",
    e.monthDropDownList.menu.datePicker = e,
    e.monthDropDownList.menu.onmousedown = function() {
        this.isTouchEndFlag || this.ontouchstart(!0)
    }
    ,
    e.monthDropDownList.menu.ontouchstart = function(A) {
        var e = this;
        this.isTouchEndFlag = !A,
        clearTimeout(this.isTouchEndTimer),
        this.jsObject.options.dropDownListMenuPressed = this,
        this.datePicker.ontouchstart(),
        this.isTouchEndTimer = setTimeout(function() {
            e.isTouchEndFlag = !1
        }, 1e3)
    }
    ,
    e.yearTextBox = this.TextBox(null, 40, "Year"),
    e.yearTextBox.style.margin = "1px 2px 0 0",
    e.yearTextBox.datePicker = e,
    e.yearTextBox.action = function() {
        var A = this.jsObject.strToCorrectPositiveInt(this.value);
        this.value = A,
        this.datePicker.key.setYear(A),
        this.datePicker.repaintDays(),
        this.datePicker.action()
    }
    ,
    t.addCell(e.yearTextBox),
    e.nextMonthButton = this.SmallButton(null, null, "ArrowRight.png"),
    e.nextMonthButton.datePicker = e,
    e.nextMonthButton.style.margin = "1px 1px 0 0",
    e.nextMonthButton.action = function() {
        var A = this.datePicker.key.getMonth()
          , e = this.datePicker.key.getFullYear();
        A++,
        12 == A && (A = 0,
        e++);
        var t = this.jsObject.GetCountDaysOfMonth(e, A);
        t < this.datePicker.key.getDate() && this.datePicker.key.setDate(t),
        this.datePicker.key.setMonth(A),
        this.datePicker.key.setYear(e),
        this.datePicker.fill(),
        this.datePicker.action()
    }
    ,
    t.addCell(e.nextMonthButton);
    var o = document.createElement("div");
    o.style.margin = "2px 0 2px 0",
    o.className = "stiJsViewerDatePickerSeparator",
    e.innerContent.appendChild(o),
    e.daysTable = this.CreateHTMLTable(),
    e.innerContent.appendChild(e.daysTable),
    "Sunday" == this.options.appearance.datePickerFirstDayOfWeek && (this.collections.dayOfWeek.splice(6, 1),
    this.collections.dayOfWeek.splice(0, 0, "Sunday"));
    for (var i = 0; i < 7; i++) {
        var s = e.daysTable.addCell();
        s.className = "stiJsViewerDatePickerDayOfWeekCell";
        var n = this.collections.loc["Day" + this.collections.dayOfWeek[i]];
        n && (s.innerHTML = n.toString().substring(0, 1).toUpperCase()),
        i == ("Sunday" == this.options.appearance.datePickerFirstDayOfWeek ? 6 : 5) && (s.style.color = "#0000ff"),
        i == ("Sunday" == this.options.appearance.datePickerFirstDayOfWeek ? 0 : 6) && (s.style.color = "#ff0000")
    }
    e.daysTable.addRow();
    for (var a = 1, i = 0; i < 42; i++) {
        var r = this.DatePickerDayButton();
        r.datePicker = e,
        r.style.margin = "1px",
        e.dayButtons.push(r),
        e.daysTable.addCellInRow(a, r),
        (i + 1) % 7 == 0 && (e.daysTable.addRow(),
        a++)
    }
    var l = document.createElement("div");
    l.style.margin = "2px 0 2px 0",
    l.className = "stiJsViewerDatePickerSeparator",
    e.innerContent.appendChild(l);
    var c = this.CreateHTMLTable();
    c.style.width = "100%",
    e.innerContent.appendChild(c),
    c.addTextCell(this.collections.loc.Time + ":").style.padding = "0 4px 0 4px";
    var p = this.TextBox(null, 90);
    p.style.margin = "1px 2px 2px 2px";
    var h = c.addCell(p);
    return h.style.width = "100%",
    h.style.textAlign = "right",
    e.time = p,
    p.action = function() {
        var A = this.jsObject.stringToTime(this.value);
        e.key.setHours(A.hours),
        e.key.setMinutes(A.minutes),
        e.key.setSeconds(A.seconds),
        this.value = this.jsObject.formatDate(e.key, "h:nn:ss"),
        e.action()
    }
    ,
    e.repaintDays = function() {
        var A = this.key.getMonth()
          , e = this.key.getFullYear()
          , t = this.jsObject.GetCountDaysOfMonth(e, A)
          , o = this.jsObject.GetDayOfWeek(e, A, 1);
        "Monday" == this.jsObject.options.appearance.datePickerFirstDayOfWeek ? o-- : 7 == o && "Sunday" == this.jsObject.options.appearance.datePickerFirstDayOfWeek && (o = 0);
        for (var i = 0; i < 42; i++) {
            var s = i - o + 1
              , n = s == this.key.getDate()
              , a = this.dayButtons[i];
            i < o || i - o > t - 1 ? (a.caption.innerHTML = "",
            a.setEnabled(!1)) : (a.numberOfDay = s,
            a.caption.innerHTML = s,
            a.setEnabled(!0),
            a.setSelected(n))
        }
    }
    ,
    e.fill = function() {
        this.yearTextBox.value = this.key.getFullYear(),
        this.monthDropDownList.setKey(this.key.getMonth()),
        this.repaintDays(),
        this.showTime && (this.time.value = this.jsObject.formatDate(this.key, "h:nn:ss"))
    }
    ,
    e.onshow = function() {
        this.key = new Date,
        this.ownerValue && (this.key = new Date(this.ownerValue.year,this.ownerValue.month - 1,this.ownerValue.day,this.ownerValue.hours,this.ownerValue.minutes,this.ownerValue.seconds)),
        l.style.display = this.showTime ? "" : "none",
        c.style.display = this.showTime ? "" : "none",
        this.fill()
    }
    ,
    e.action = function() {
        this.ownerValue || (this.ownerValue = this.jsObject.getNowDateTimeObject()),
        this.ownerValue.year = this.key.getFullYear(),
        this.ownerValue.month = this.key.getMonth() + 1,
        this.ownerValue.day = this.key.getDate(),
        this.ownerValue.hours = this.key.getHours(),
        this.ownerValue.minutes = this.key.getMinutes(),
        this.ownerValue.seconds = this.key.getSeconds(),
        this.parentDataControl && (this.parentDataControl.value = this.jsObject.dateTimeObjectToString(e.ownerValue, this.parentDataControl.parameter.params.dateTimeType))
    }
    ,
    e.onmousedown = function() {
        this.isTouchStartFlag || this.ontouchstart(!0)
    }
    ,
    e.ontouchstart = function(A) {
        var e = this;
        this.isTouchStartFlag = !A,
        clearTimeout(this.isTouchStartTimer),
        this.jsObject.options.datePickerPressed = this,
        this.isTouchStartTimer = setTimeout(function() {
            e.isTouchStartFlag = !1
        }, 1e3)
    }
    ,
    e.changeVisibleState = function(A) {
        var e = "stiJsViewerMainPanel";
        if (A) {
            this.onshow(),
            this.style.display = "",
            this.visible = !0,
            this.style.overflow = "hidden",
            this.parentDataControl.setSelected(!0),
            this.parentButton.setSelected(!0),
            this.jsObject.options.currentDatePicker = this,
            this.style.width = this.innerContent.offsetWidth + "px",
            this.style.height = this.innerContent.offsetHeight + "px",
            this.style.left = this.jsObject.FindPosX(this.parentButton, e) + "px",
            this.style.top = this.jsObject.FindPosY(this.parentButton, e) + this.parentButton.offsetHeight + 1 + "px",
            this.innerContent.style.top = -this.innerContent.offsetHeight + "px";
            var t = new Date
              , o = t.getTime();
            this.jsObject.options.toolbar.menuAnimation && (o += this.jsObject.options.menuAnimDuration),
            this.jsObject.ShowAnimationVerticalMenu(this, 0, o)
        } else
            clearTimeout(this.innerContent.animationTimer),
            this.showTime = !1,
            this.visible = !1,
            this.parentDataControl.setSelected(!1),
            this.parentButton.setSelected(!1),
            this.style.display = "none",
            this.jsObject.options.currentDatePicker == this && (this.jsObject.options.currentDatePicker = null)
    }
    ,
    e
}
,
StiJsViewer.prototype.DatePickerDayButton = function() {
    var A = this.SmallButton(null, "0", null, null, null, "stiJsViewerDatePickerDayButton")
      , e = this.options.isTouchDevice ? "25px" : "23px";
    return A.style.width = e,
    A.style.height = e,
    A.caption.style.textAlign = "center",
    A.innerTable.style.width = "100%",
    A.caption.style.padding = "0px",
    A.numberOfDay = 1,
    A.action = function() {
        this.datePicker.key.setDate(parseInt(this.numberOfDay)),
        this.setSelected(!0),
        this.datePicker.action(),
        this.datePicker.doubleDatePicker || this.datePicker.changeVisibleState(!1)
    }
    ,
    A.setSelected = function(A) {
        A && (this.datePicker.selectedButton && this.datePicker.selectedButton.setSelected(!1),
        this.datePicker.selectedButton = this),
        this.isSelected = A,
        this.className = this.styleName + " " + this.styleName + (A ? "Selected" : this.isEnabled ? this.isOver ? "Over" : "Default" : "Disabled")
    }
    ,
    A
}
,
StiJsViewer.prototype.GetDayOfWeek = function(A, e) {
    var t = new Date(A,e,1).getDay();
    return 0 == t && (t = 7),
    t
}
,
StiJsViewer.prototype.GetCountDaysOfMonth = function(A, e) {
    var t = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
      , o = t[e];
    return 1 == e && (o = A % 4 != 0 || A % 100 == 0 && A % 400 != 0 ? 28 : 29),
    o
}
,
StiJsViewer.prototype.GetMonthesForDatePickerItems = function() {
    for (var A = [], e = 0; e < this.collections.months.length; e++)
        A.push(this.Item("Month" + e, this.collections.loc["Month" + this.collections.months[e]], null, e));
    return A
}
,
StiJsViewer.prototype.GetDayOfWeekItems = function() {
    for (var A = [], e = 0; e < this.collections.dayOfWeek.length; e++)
        A.push(this.Item("DayOfWeekItem" + e, this.collections.loc["Day" + this.collections.dayOfWeek[e]], null, this.collections.dayOfWeek[e]));
    return A
}
,
StiJsViewer.prototype.GetFirstDayOfWeek = function() {
    var A = new Date
      , e = A.toLocaleTimeString();
    return e.toLowerCase().indexOf("am") >= 0 || e.toLowerCase().indexOf("pm") >= 0 ? 0 : 1
}
,
StiJsViewer.prototype.InitializeDisabledPanels = function() {
    this.controls.disabledPanels = {};
    for (var A = 1; A < 5; A++) {
        var e = document.createElement("div");
        e.jsObject = this,
        e.style.display = "none",
        this.controls.mainPanel.appendChild(e),
        this.controls.disabledPanels[A] = e,
        e.style.zIndex = 10 * A,
        e.className = "stiJsViewerDisabledPanel",
        e.changeVisibleState = function(A) {
            this.style.display = A ? "" : "none"
        }
        ,
        e.onmousedown = function() {
            this.isTouchStartFlag || e.ontouchstart(!0)
        }
        ,
        e.ontouchstart = function(A) {
            var t = this;
            this.isTouchStartFlag = !A,
            clearTimeout(this.isTouchStartTimer),
            e.jsObject.options.disabledPanelPressed = !0,
            this.isTouchStartTimer = setTimeout(function() {
                t.isTouchStartFlag = !1
            }, 1e3)
        }
    }
}
,
StiJsViewer.prototype.InitializeDrillDownPanel = function() {
    var A = document.createElement("div");
    this.controls.drillDownPanel = A,
    this.controls.mainPanel.appendChild(A),
    A.jsObject = this,
    A.className = "stiJsViewerToolBar",
    A.style.display = "none";
    var e = document.createElement("div");
    A.appendChild(e),
    e.style.padding = "0 2px 2px 2px";
    var t = this.CreateHTMLTable();
    t.className = "stiJsViewerToolBarTable",
    e.appendChild(t),
    t.style.margin = "0px",
    "" != this.options.toolbar.fontColor && (t.style.color = this.options.toolbar.fontColor),
    t.style.fontFamily = this.options.toolbar.fontFamily;
    var o = this.CreateHTMLTable();
    return t.addCell(o),
    A.buttonsRow = o.rows[0],
    A.buttons = {},
    A.selectedButton = null,
    A.changeVisibleState = function(A) {
        this.style.display = A ? "" : "none";
        var e = this.offsetHeight
          , t = this.jsObject.controls.parametersPanel ? this.jsObject.controls.parametersPanel.offsetHeight : 0
          , o = this.jsObject.options.toolbar.visible ? this.jsObject.controls.toolbar.offsetHeight : 0;
        this.jsObject.controls.parametersPanel && (this.jsObject.controls.parametersPanel.style.top = o + e + "px"),
        this.jsObject.controls.bookmarksPanel && (this.jsObject.controls.bookmarksPanel.style.top = o + t + e + "px"),
        this.jsObject.controls.reportPanel.style.marginTop = ("relative" == this.jsObject.controls.reportPanel.style.position ? t : e + t) + "px"
    }
    ,
    A.addButton = function(e, t) {
        var i = "button" + (A.buttonsRow.children.length + 1)
          , s = A.jsObject.SmallButton(i, e);
        s.style.display = "inline-block",
        s.reportParams = t ? t : this.reportParams = {},
        A.buttons[i] = s,
        s.style.margin = "2px 1px 2px 2px";
        var n = o.addCell(s);
        if (n.style.padding = "0px",
        n.style.border = "0px",
        n.style.lineHeight = "0px",
        s.select = function() {
            A.selectedButton && A.selectedButton.setSelected(!1),
            this.setSelected(!0),
            A.selectedButton = this,
            A.jsObject.reportParams = this.reportParams
        }
        ,
        s.action = function() {
            "none" != this.style.display && (this.select(),
            A.jsObject.postAction("Refresh"))
        }
        ,
        s.select(),
        "button1" != i) {
            var a = A.jsObject.SmallButton(null, null, "CloseForm.png");
            a.style.display = "inline-block",
            a.style.margin = "0 2px 0 0",
            a.image.style.margin = "1px 0 0 -1px",
            a.imageCell.style.padding = 0,
            a.style.width = A.jsObject.options.isTouchDevice ? "22px" : "17px",
            a.style.height = a.style.width,
            a.reportButton = s,
            s.innerTable.addCell(a),
            a.action = function() {
                this.reportButton.style.display = "none",
                this.reportButton.isSelected && A.buttons.button1.action()
            }
            ,
            a.onmouseenter = function(A) {
                this.reportButton.onmouseoutAction(),
                this.onmouseoverAction(),
                A && A.stopPropagation()
            }
        }
    }
    ,
    A.reset = function() {
        if (o.tr[0].childNodes.length > 0) {
            A.buttons = {};
            while (o.tr[0].childNodes.length > 0)
                o.tr[0].removeChild(o.tr[0].childNodes[o.tr[0].childNodes.length - 1])
        }
        A.changeVisibleState(!1)
    }
    ,
    A
}
,
StiJsViewer.prototype.DropDownList = function(A, e, t, o, i, s) {
    var n = this.CreateHTMLTable();
    n.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (n.style.color = this.options.toolbar.fontColor),
    n.jsObject = this,
    n.name = A,
    n.key = null,
    n.imageCell = null,
    n.readOnly = i,
    n.items = null == o ? {} : o,
    n.isEnabled = !0,
    n.isSelected = !1,
    n.isOver = !1,
    n.isFocused = !1,
    n.fullWidth = e + 3,
    t && n.setAttribute("title", t);
    var a = e - (this.options.isTouchDevice ? 23 : 15) - (s ? 38 : 0);
    return n.className = "stiJsViewerDropDownList",
    A && (this.controls.dropDownLists || (this.controls.dropDownLists = {}),
    this.controls.dropDownLists[A] = n),
    s && (n.image = document.createElement("div"),
    n.image.dropDownList = n,
    n.image.jsObject = this,
    n.image.className = "stiJsViewerDropDownListImage",
    n.imageCell.style.lineHeight = "0",
    n.imageCell = n.addCell(n.image),
    i && (n.image.onclick = function() {
        this.isTouchEndFlag || this.jsObject.options.isTouchClick || this.dropDownList.button.onclick()
    }
    ,
    n.image.ontouchend = function() {
        var A = this;
        this.isTouchEndFlag = !0,
        clearTimeout(this.isTouchEndTimer),
        this.dropDownList.button.ontouchend(),
        this.isTouchEndTimer = setTimeout(function() {
            A.isTouchEndFlag = !1
        }, 1e3)
    }
    )),
    n.textBox = document.createElement("input"),
    n.textBox.jsObject = this,
    n.addCell(n.textBox),
    n.textBox.style.width = a + "px",
    n.textBox.dropDownList = n,
    n.textBox.readOnly = i,
    n.textBox.style.border = 0,
    n.textBox.style.cursor = i ? "default" : "text",
    n.textBox.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (n.textBox.style.color = this.options.toolbar.fontColor),
    n.textBox.style.height = this.options.isTouchDevice ? "23px" : "18px",
    n.textBox.style.lineHeight = n.textBox.style.height,
    n.textBox.className = "stiJsViewerDropDownList_TextBox",
    i && (n.textBox.onclick = function() {
        this.isTouchEndFlag || this.jsObject.options.isTouchDevice || this.jsObject.options.isTouchClick || this.dropDownList.button.onclick()
    }
    ,
    n.textBox.ontouchend = function() {
        var A = this;
        this.isTouchEndFlag = !0,
        clearTimeout(this.isTouchEndTimer),
        this.dropDownList.button.ontouchend(),
        this.isTouchEndTimer = setTimeout(function() {
            A.isTouchEndFlag = !1
        }, 1e3)
    }
    ),
    n.textBox.action = function() {
        this.dropDownList.readOnly || (this.dropDownList.setKey(this.value),
        this.dropDownList.action())
    }
    ,
    n.textBox.onfocus = function() {
        this.isFocused = !0,
        this.dropDownList.isFocused = !0,
        this.dropDownList.setSelected(!0)
    }
    ,
    n.textBox.onblur = function() {
        this.isFocused = !1,
        this.dropDownList.isFocused = !1,
        this.dropDownList.setSelected(!1),
        this.action()
    }
    ,
    n.textBox.onkeypress = function(A) {
        if (this.dropDownList.readOnly)
            return !1;
        if (A && 13 == A.keyCode)
            return this.action(),
            !1
    }
    ,
    n.button = this.SmallButton(null, null, "ButtonArrowDown.png", null, null, "stiJsViewerDropDownListButton"),
    n.button.style.height = this.isTouchDevice ? "26px" : "21px",
    n.addCell(n.button),
    n.button.dropDownList = n,
    n.button.action = function() {
        this.dropDownList.menu.visible ? this.dropDownList.menu.changeVisibleState(!1) : (this.dropDownList.menu.isDinamic && this.dropDownList.menu.addItems(this.dropDownList.items),
        this.dropDownList.menu.changeVisibleState(!0))
    }
    ,
    n.menu = this.DropDownListMenu(n),
    this.controls.mainPanel.appendChild(n.menu),
    n.menu.isDinamic = null == o,
    null != o && n.menu.addItems(o),
    n.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }
    ,
    n.onmouseenter = function() {
        if (!this.isEnabled)
            return;
        this.isOver = !0,
        this.isSelected || this.isFocused || (this.className = "stiJsViewerDropDownListOver")
    }
    ,
    n.onmouseleave = function() {
        if (!this.isEnabled)
            return;
        this.isOver = !1,
        this.isSelected || this.isFocused || (this.className = "stiJsViewerDropDownList")
    }
    ,
    n.setEnabled = function(A) {
        this.isEnabled = A,
        this.button.setEnabled(A),
        this.textBox.disabled = !A,
        this.textBox.style.visibility = A ? "visible" : "hidden",
        this.className = A ? "stiJsViewerDropDownList" : "stiJsViewerDropDownListDisabled",
        this.imageCell && (this.image.style.visibility = A ? "visible" : "hidden")
    }
    ,
    n.setSelected = function(A) {
        this.isSelected = A,
        this.className = A ? "stiJsViewerDropDownListOver" : this.isEnabled ? this.isOver ? "stiJsViewerDropDownListOver" : "stiJsViewerDropDownList" : "stiJsViewerDropDownListDisabled"
    }
    ,
    n.setKey = function(A) {
        this.key = A;
        for (var e in this.items)
            if (A == this.items[e].key)
                return this.textBox.value = this.items[e].caption,
                void (this.image && (this.image.style.background = "url(" + this.jsObject.collections.images[this.items[e].imageName] + ")"));
        this.textBox.value = A.toString()
    }
    ,
    n.haveKey = function(A) {
        for (var e in this.items)
            if (this.items[e].key == A)
                return !0;
        return !1
    }
    ,
    n.action = function() {}
    ,
    n
}
,
StiJsViewer.prototype.DropDownListMenu = function(A) {
    var e = this.VerticalMenu(A.name, A.button, "Down", A.items, "stiJsViewerMenuStandartItem", "stiJsViewerDropdownMenu");
    return e.dropDownList = A,
    e.innerContent.style.minWidth = A.fullWidth + "px",
    e.changeVisibleState = function(A) {
        var e = "stiJsViewerMainPanel";
        if (A) {
            this.onshow(),
            this.style.display = "",
            this.visible = !0,
            this.style.overflow = "hidden",
            this.parentButton.dropDownList.setSelected(!0),
            this.parentButton.setSelected(!0),
            this.jsObject.options.currentDropDownListMenu = this,
            this.style.width = this.innerContent.offsetWidth + "px",
            this.style.height = this.innerContent.offsetHeight + "px",
            this.style.left = this.jsObject.FindPosX(this.parentButton.dropDownList, e) + "px",
            this.style.top = this.jsObject.FindPosY(this.parentButton.dropDownList, e) + this.parentButton.offsetHeight + 3 + "px",
            this.innerContent.style.top = -this.innerContent.offsetHeight + "px",
            d = new Date;
            var t = d.getTime();
            this.jsObject.options.toolbar.menuAnimation && (t += this.jsObject.options.menuAnimDuration),
            this.jsObject.ShowAnimationVerticalMenu(this, 0, t)
        } else
            clearTimeout(this.innerContent.animationTimer),
            this.visible = !1,
            this.parentButton.dropDownList.setSelected(!1),
            this.parentButton.setSelected(!1),
            this.style.display = "none",
            this.jsObject.options.currentDropDownListMenu == this && (this.jsObject.options.currentDropDownListMenu = null)
    }
    ,
    e.onmousedown = function() {
        this.isTouchStartFlag || this.ontouchstart(!0)
    }
    ,
    e.ontouchstart = function(A) {
        var e = this;
        this.isTouchStartFlag = !A,
        clearTimeout(this.isTouchStartTimer),
        this.jsObject.options.dropDownListMenuPressed = this,
        this.isTouchStartTimer = setTimeout(function() {
            e.isTouchStartFlag = !1
        }, 1e3)
    }
    ,
    e.action = function(A) {
        this.changeVisibleState(!1),
        this.dropDownList.key = A.key,
        this.dropDownList.textBox.value = A.caption.innerHTML,
        this.dropDownList.image && (this.dropDownList.image.style.background = "url(" + this.jsObject.collections.images[A.imageName] + ")"),
        this.dropDownList.action()
    }
    ,
    e.onshow = function() {
        if (null == this.dropDownList.key)
            return;
        for (var A in this.items) {
            if (this.dropDownList.key == this.items[A].key)
                return void this.items[A].setSelected(!0);
            this.items[A].setSelected(!1)
        }
    }
    ,
    e
}
,
StiJsViewer.prototype.InitializeFindPanel = function() {
    var A = document.createElement("div");
    A.style.display = "none",
    A.controls = {},
    this.controls.findPanel = A,
    this.controls.mainPanel.appendChild(A),
    A.jsObject = this,
    A.className = "stiJsViewerToolBar";
    var e = document.createElement("div");
    A.innerContent = e,
    A.appendChild(e),
    e.style.padding = "0 3px 3px 3px";
    var t = document.createElement("div");
    e.appendChild(t),
    t.className = "stiJsViewerToolBarTable";
    var o = this.CreateHTMLTable();
    t.appendChild(o);
    for (var i = [["close", this.SmallButton(null, null, "CloseFindPanel.png", null), "2px"], ["text", this.TextBlock(this.collections.loc.FindWhat), "2px"], ["findTextBox", this.TextBox(null, 170), "2px"], ["findPreviows", this.SmallButton(null, this.collections.loc.FindPrevious, "ArrowUpBlue.png"), "2px"], ["findNext", this.SmallButton(null, this.collections.loc.FindNext, "ArrowDownBlue.png"), "2px"], ["matchCase", this.SmallButton(null, this.collections.loc.MatchCase.replace("&", ""), null), "2px"], ["matchWholeWord", this.SmallButton(null, this.collections.loc.MatchWholeWord.replace("&", ""), null), "2px"]], s = 0; s < i.length; s++)
        A.controls[i[s][0]] = i[s][1],
        o.addCell(i[s][1]),
        i[s][1].style.margin = i[s][2];
    var n = function(e) {
        if ("" == A.controls.findTextBox.value)
            return void A.jsObject.hideFindLabels();
        A.jsObject.controls.findHelper.lastFindText != A.controls.findTextBox.value || A.jsObject.options.changeFind ? A.jsObject.showFindLabels(A.controls.findTextBox.value) : A.jsObject.selectFindLabel(e)
    };
    A.controls.close.action = function() {
        A.changeVisibleState(!1)
    }
    ,
    A.controls.findTextBox.onkeyup = function(A) {
        A && 13 == A.keyCode && n("Next")
    }
    ,
    A.controls.matchCase.action = function() {
        this.setSelected(!this.isSelected),
        this.jsObject.options.changeFind = !0
    }
    ,
    A.controls.matchWholeWord.action = function() {
        this.setSelected(!this.isSelected),
        this.jsObject.options.changeFind = !0
    }
    ,
    A.controls.findPreviows.action = function() {
        n("Previows")
    }
    ,
    A.controls.findNext.action = function() {
        n("Next")
    }
    ,
    A.changeVisibleState = function(e) {
        var t = this.jsObject.options
          , o = this.jsObject.controls;
        e || this.jsObject.hideFindLabels(),
        this.style.display = e ? "" : "none",
        e && (A.controls.findTextBox.value = "",
        A.controls.findTextBox.focus()),
        t.toolbar.showFindButton && o.toolbar.controls.Find.setSelected(e),
        o.parametersPanel && (o.parametersPanel.style.top = (t.toolbar.visible ? o.toolbar.offsetHeight : 0) + (o.findPanel ? o.findPanel.offsetHeight : 0) + "px"),
        o.bookmarksPanel && (o.bookmarksPanel.style.top = (t.toolbar.visible ? o.toolbar.offsetHeight : 0) + (o.findPanel ? o.findPanel.offsetHeight : 0) + (o.parametersPanel ? o.parametersPanel.offsetHeight : 0) + "px"),
        o.reportPanel.style.marginTop = (o.parametersPanel ? o.parametersPanel.offsetHeight : 0) + ("absolute" == o.reportPanel.style.position && o.findPanel ? o.findPanel.offsetHeight : 0) + "px"
    }
}
,
StiJsViewer.prototype.FormButton = function(A, e, t, o) {
    var i = this.SmallButton(A, e || "", t, null, null, "stiJsViewerFormButton");
    return i.innerTable.style.width = "100%",
    i.style.minWidth = (o || 80) + "px",
    i.caption.style.textAlign = "center",
    i
}
,
StiJsViewer.prototype.GroupPanel = function(A, e, t, o) {
    var i = document.createElement("div");
    i.style.fontFamily = this.options.toolbar.fontFamily,
    i.style.color = this.options.toolbarFontColor,
    i.jsObject = this,
    t && (i.style.minWidth = t + "px"),
    i.style.overflow = "hidden",
    i.isOpened = e;
    var s = this.FormButton(null, A, e ? "ArrowDownGray.png" : "ArrowRight.png");
    s.imageCell.style.width = "1px",
    s.caption && (s.caption.style.textAlign = "left",
    s.caption.style.padding = "0 15px 0 5px"),
    i.appendChild(s);
    var n = document.createElement("div");
    return o && (n.style.padding = o),
    n.style.display = e ? "" : "none",
    n.className = "stiJsViewerGroupPanelContainer",
    i.container = n,
    i.appendChild(n),
    i.changeOpeningState = function(A) {
        i.isOpened = A,
        s.image.src = i.jsObject.collections.images[A ? "ArrowDownGray.png" : "ArrowRight.png"],
        n.style.display = A ? "" : "none"
    }
    ,
    s.action = function() {
        i.isOpened = !i.isOpened,
        s.image.src = i.jsObject.collections.images[i.isOpened ? "ArrowDownGray.png" : "ArrowRight.png"],
        i.style.height = (i.isOpened ? s.offsetHeight : s.offsetHeight + n.offsetHeight) + "px",
        i.isOpened && (n.style.display = ""),
        i.jsObject.animate(i, {
            duration: 150,
            animations: [{
                style: "height",
                start: i.isOpened ? s.offsetHeight : s.offsetHeight + n.offsetHeight,
                end: i.isOpened ? s.offsetHeight + n.offsetHeight : s.offsetHeight,
                postfix: "px",
                finish: function() {
                    n.style.display = i.isOpened ? "" : "none",
                    i.style.height = ""
                }
            }]
        })
    }
    ,
    i
}
,
StiJsViewer.prototype.CreateHTMLTable = function(A, e) {
    var t = document.createElement("table");
    return t.jsObject = this,
    this.clearStyles(t),
    t.cellPadding = 0,
    t.cellSpacing = 0,
    t.tbody = document.createElement("tbody"),
    t.appendChild(t.tbody),
    t.tr = [],
    t.tr[0] = document.createElement("tr"),
    this.clearStyles(t.tr[0]),
    t.tbody.appendChild(t.tr[0]),
    t.addCell = function(A) {
        var e = document.createElement("td");
        return this.jsObject.clearStyles(e),
        this.tr[0].appendChild(e),
        A && e.appendChild(A),
        e
    }
    ,
    t.addCellInNextRow = function(A) {
        var e = this.tr.length;
        this.tr[e] = document.createElement("tr"),
        this.jsObject.clearStyles(this.tr[e]),
        this.tbody.appendChild(this.tr[e]);
        var t = document.createElement("td");
        return this.jsObject.clearStyles(t),
        this.tr[e].appendChild(t),
        A && t.appendChild(A),
        t
    }
    ,
    t.addCellInLastRow = function(A) {
        var e = this.tr.length
          , t = document.createElement("td");
        return this.jsObject.clearStyles(t),
        this.tr[e - 1].appendChild(t),
        A && t.appendChild(A),
        t
    }
    ,
    t.addTextCellInLastRow = function(A) {
        var e = this.tr.length
          , t = document.createElement("td");
        return this.jsObject.clearStyles(t),
        this.tr[e - 1].appendChild(t),
        t.innerHTML = A,
        t
    }
    ,
    t.addCellInRow = function(A, e) {
        var t = document.createElement("td");
        return this.jsObject.clearStyles(t),
        this.tr[A].appendChild(t),
        e && t.appendChild(e),
        t
    }
    ,
    t.addTextCell = function(A) {
        var e = document.createElement("td");
        return this.jsObject.clearStyles(e),
        this.tr[0].appendChild(e),
        e.innerHTML = A,
        e
    }
    ,
    t.addRow = function() {
        var A = this.tr.length;
        return this.tr[A] = document.createElement("tr"),
        this.jsObject.clearStyles(this.tr[A]),
        this.tbody.appendChild(this.tr[A]),
        this.tr[A]
    }
    ,
    t
}
,
StiJsViewer.prototype.TextBlock = function(A) {
    var e = document.createElement("div");
    return e.style.fontFamily = this.options.toolbar.fontFamily,
    e.style.fontSize = "12px",
    e.innerHTML = A,
    e
}
,
StiJsViewer.prototype.InitializeInteractions = function(A) {
    A.getComponentOffset = function(A) {
        var e = 0
          , t = 0
          , o = A;
        while (A && !isNaN(A.offsetLeft) && !isNaN(A.offsetTop) && (A == o || "" == A.style.position || "static" == A.style.position))
            e += A.offsetLeft - A.scrollLeft,
            t += A.offsetTop - A.scrollTop,
            A = A.offsetParent;
        return {
            top: t,
            left: e
        }
    }
    ,
    A.paintSortingArrow = function(A, e) {
        var t = document.createElement("img");
        t.src = "asc" == e ? this.jsObject.collections.images["ArrowDown.png"] : this.jsObject.collections.images["ArrowUp.png"];
        var o = this.jsObject.reportParams.zoom / 100 * 9
          , i = this.jsObject.reportParams.zoom / 100 * 5;
        t.style.position = "absolute",
        t.style.width = o + "px",
        t.style.height = i + "px",
        A.appendChild(t);
        var s = A.style.position
          , n = A.className;
        A.style.position = "relative",
        n || (A.className = "stiSortingParentElement");
        var a = this.jsObject.FindPosX(t, A.className)
          , r = this.jsObject.FindPosY(t, A.className);
        t.style.marginLeft = A.offsetWidth - a - o - this.jsObject.reportParams.zoom / 100 * 3 + "px",
        t.style.marginTop = A.offsetHeight / 2 - i / 2 - r + "px",
        A.style.position = s,
        A.className = n
    }
    ,
    A.paintCollapsingIcon = function(e, t) {
        var o = document.createElement("img");
        o.src = t ? this.jsObject.collections.images["CollapsingPlus.png"] : this.jsObject.collections.images["CollapsingMinus.png"],
        o.style.position = "absolute";
        var i = this.jsObject.reportParams.zoom / 100 * 10
          , s = this.jsObject.reportParams.zoom / 100 * 10;
        o.style.width = i + "px",
        o.style.height = s + "px",
        e.appendChild(o);
        var n = A.getComponentOffset(e)
          , a = A.getComponentOffset(o);
        o.style.marginLeft = n.left - a.left + i / 3 + "px",
        o.style.marginTop = n.top - a.top + i / 3 + "px"
    }
    ,
    A.postInteractionSorting = function(A, e) {
        var t = {
            action: "Sorting",
            sortingParameters: {
                ComponentName: A.getAttribute("interaction") + ";" + e.toString(),
                DataBand: A.getAttribute("databandsort")
            }
        };
        this.jsObject.controls.parametersPanel && (t.variables = this.jsObject.controls.parametersPanel.getParametersValues()),
        this.jsObject.postInteraction(t)
    }
    ,
    A.postInteractionDrillDown = function(A) {
        var e = {
            action: "DrillDown",
            drillDownParameters: {
                ComponentIndex: A.getAttribute("compindex"),
                PageIndex: A.getAttribute("pageindex"),
                PageGuid: A.getAttribute("pageguid"),
                ReportFile: null
            }
        };
        this.jsObject.postInteraction(e)
    }
    ,
    A.postInteractionCollapsing = function(A) {
        var e = A.getAttribute("interaction")
          , t = A.getAttribute("compindex")
          , o = "true" != A.getAttribute("collapsed");
        this.jsObject.reportParams.interactionCollapsingStates || (this.jsObject.reportParams.interactionCollapsingStates = {}),
        this.jsObject.reportParams.interactionCollapsingStates[e] || (this.jsObject.reportParams.interactionCollapsingStates[e] = {}),
        this.jsObject.reportParams.interactionCollapsingStates[e][t] = o;
        var i = {
            action: "Collapsing",
            collapsingParameters: {
                ComponentName: e,
                InteractionCollapsingStates: this.jsObject.reportParams.interactionCollapsingStates
            }
        };
        this.jsObject.controls.parametersPanel && (i.variables = this.jsObject.controls.parametersPanel.getParametersValues()),
        this.jsObject.postInteraction(i)
    }
    ;
    for (var e = A.getElementsByTagName("TD"), t = [], o = 0; o < e.length; o++)
        if (e[o].getAttribute("interaction") && (e[o].getAttribute("pageguid") || e[o].getAttribute("collapsed") || e[o].getAttribute("databandsort"))) {
            e[o].style.cursor = "pointer",
            e[o].jsObject = this;
            var i = e[o].getAttribute("sort");
            i && A.paintSortingArrow(e[o], i);
            var s = e[o].getAttribute("collapsed");
            if (s) {
                var n = e[o].getAttribute("compindex") + "|" + e[o].getAttribute("interaction");
                t.indexOf(n) < 0 && (A.paintCollapsingIcon(e[o], "true" == s),
                t.push(n))
            }
            e[o].onclick = function(e) {
                this.getAttribute("pageguid") ? A.postInteractionDrillDown(this) : this.getAttribute("collapsed") ? A.postInteractionCollapsing(this) : A.postInteractionSorting(this, e.ctrlKey)
            }
        }
}
,
StiJsViewer.prototype.InitializeJsViewer = function() {
    this.controls.viewer.jsObject = this,
    this.controls.viewer.pressedDown = function() {
        var A = this.jsObject.options;
        this.jsObject.removeBookmarksLabel(),
        null != A.currentMenu && (A.menuPressed == A.currentMenu || A.currentMenu.parentButton == A.buttonPressed || A.datePickerPressed || A.dropDownListMenuPressed || A.currentMenu.changeVisibleState(!1)),
        null != A.currentDropDownListMenu && A.dropDownListMenuPressed != A.currentDropDownListMenu && A.currentDropDownListMenu.parentButton != A.buttonPressed && A.currentDropDownListMenu.changeVisibleState(!1),
        null != A.currentDatePicker && A.datePickerPressed != A.currentDatePicker && A.currentDatePicker.parentButton != A.buttonPressed && A.currentDatePicker.changeVisibleState(!1),
        A.buttonPressed = !1,
        A.menuPressed = !1,
        A.formPressed = !1,
        A.dropDownListMenuPressed = !1,
        A.disabledPanelPressed = !1,
        A.datePickerPressed = !1,
        A.fingerIsMoved = !1
    }
    ,
    this.controls.viewer.onmousedown = function() {
        if (this.isTouchStartFlag)
            return;
        this.jsObject.options.isTouchClick = !1,
        this.pressedDown()
    }
    ,
    this.controls.viewer.ontouchstart = function() {
        var A = this;
        this.isTouchStartFlag = !0,
        clearTimeout(this.isTouchStartTimer),
        this.jsObject.options.buttonsTimer && (clearTimeout(this.jsObject.options.buttonsTimer[2]),
        this.jsObject.options.buttonsTimer[0].className = this.jsObject.options.buttonsTimer[1],
        this.jsObject.options.buttonsTimer = null),
        this.jsObject.options.isTouchClick = !0,
        this.pressedDown(),
        this.isTouchStartTimer = setTimeout(function() {
            A.isTouchStartFlag = !1
        }, 1e3)
    }
    ,
    this.controls.viewer.onmouseup = function() {
        if (this.isTouchEndFlag)
            return;
        this.ontouchend()
    }
    ,
    this.controls.viewer.ontouchend = function() {
        var A = this;
        this.isTouchEndFlag = !0,
        clearTimeout(this.isTouchEndTimer),
        this.jsObject.options.fingerIsMoved = !1,
        this.isTouchEndTimer = setTimeout(function() {
            A.isTouchEndFlag = !1
        }, 1e3)
    }
    ,
    this.controls.viewer.ontouchmove = function() {
        this.jsObject.options.fingerIsMoved = !0
    }
}
,
StiJsViewer.prototype.CreateParameter = function(A) {
    var e = this.CreateHTMLTable();
    if (this.options.parameters[A.name] = e,
    e.params = A,
    e.controls = {},
    e.jsObject = this,
    e.params.isNull = !1,
    e.menu = null,
    e.addCell = function(A) {
        var t = document.createElement("td");
        return t.style.height = e.jsObject.options.parameterRowHeight + "px",
        t.style.padding = "0px 2px 0 2px",
        this.tr[0].appendChild(t),
        A && t.appendChild(A),
        t
    }
    ,
    "Bool" != e.params.type || "Value" != e.params.basicType && "NullableValue" != e.params.basicType || e.addCell(this.CreateBoolCheckBox(e)),
    "Range" == e.params.basicType && (e.addCell().innerHTML = this.collections.loc.RangeFrom),
    "Bool" == e.params.type && "List" != e.params.basicType || e.addCell(this.CreateFirstTextBox(e)),
    "DateTime" == e.params.type && e.params.allowUserValues && "List" != e.params.basicType && "Range" != e.params.basicType && e.addCell(this.CreateFirstDateTimeButton(e)),
    "Guid" == e.params.type && e.params.allowUserValues && "List" != e.params.basicType && e.addCell(this.CreateFirstGuidButton(e)),
    "Range" == e.params.basicType && (e.addCell().innerHTML = this.collections.loc.RangeTo),
    "Range" == e.params.basicType && e.addCell(this.CreateSecondTextBox(e)),
    "Range" == e.params.basicType && "DateTime" == e.params.type && e.params.allowUserValues && e.addCell(this.CreateSecondDateTimeButton(e)),
    "Range" == e.params.basicType && "Guid" == e.params.type && e.params.allowUserValues && e.addCell(this.CreateSecondGuidButton(e)),
    (null != e.params.items || "List" == e.params.basicType && e.params.allowUserValues) && e.addCell(this.CreateDropDownButton(e)),
    "NullableValue" == e.params.basicType && e.params.allowUserValues && e.addCell(this.CreateNullableCheckBox(e)),
    "NullableValue" == e.params.basicType && e.params.allowUserValues) {
        var t = e.addCell();
        t.innerHTML = "Null",
        t.style.padding = "0px"
    }
    return e.setEnabled = function(A) {
        this.params.isNull = !A;
        for (var e in this.controls)
            this.controls[e].setEnabled(A)
    }
    ,
    e.changeVisibleStateMenu = function(A) {
        if (A) {
            var t = null;
            switch (this.params.basicType) {
            case "Value":
            case "NullableValue":
                t = this.jsObject.parameterMenuForValue(this);
                break;
            case "Range":
                t = this.jsObject.parameterMenuForRange(this);
                break;
            case "List":
                t = this.params.allowUserValues ? this.jsObject.parameterMenuForEditList(this) : this.jsObject.parameterMenuForNotEditList(this)
            }
            null != t && t.changeVisibleState(!0)
        } else
            null != e.menu && (e.params.allowUserValues && "List" == e.params.basicType && e.menu.updateItems(),
            e.menu.changeVisibleState(!1))
    }
    ,
    e.getStringDateTime = function(A) {
        return A.month + "/" + A.day + "/" + A.year + " " + (A.hours > 12 ? A.hours - 12 : A.hours) + ":" + A.minutes + ":" + A.seconds + " " + (A.hours < 12 ? "AM" : "PM")
    }
    ,
    e.getValue = function() {
        var A = null;
        if (e.params.isNull)
            return null;
        if ("Value" == e.params.basicType || "NullableValue" == e.params.basicType) {
            if ("Bool" == e.params.type)
                return e.controls.boolCheckBox.isChecked;
            if ("DateTime" == e.params.type)
                return this.getStringDateTime(e.params.key);
            A = e.params.allowUserValues ? e.controls.firstTextBox.value : e.params.key
        }
        if ("Range" == e.params.basicType && (A = {},
        A.from = "DateTime" == e.params.type ? this.getStringDateTime(e.params.key) : e.controls.firstTextBox.value,
        A.to = "DateTime" == e.params.type ? this.getStringDateTime(e.params.keyTo) : e.controls.secondTextBox.value),
        "List" == e.params.basicType)
            if (A = [],
            e.params.allowUserValues)
                for (var t in e.params.items)
                    A[t] = "DateTime" == e.params.type ? this.getStringDateTime(e.params.items[t].key) : e.params.items[t].key;
            else {
                num = 0;
                for (var t in e.params.items)
                    e.params.items[t].isChecked && (A[num] = "DateTime" == e.params.type ? this.getStringDateTime(e.params.items[t].key) : e.params.items[t].key,
                    num++)
            }
        return A
    }
    ,
    e.getDateTimeForReportServer = function(A) {
        var t = new Date(A.year,A.month - 1,A.day,A.hours,A.minutes,A.seconds);
        return (e.jsObject.options.cloudReportsClient.options.const_dateTime1970InTicks + 1e4 * t).toString()
    }
    ,
    e.getTimeSpanForReportServer = function(A) {
        var t = e.jsObject
          , o = A.split(":")
          , i = o[0].split(".")
          , s = i.length > 1 ? t.strToInt(i[0]) : 0
          , n = t.strToInt(i.length > 1 ? i[1] : i[0])
          , a = o.length > 1 ? t.strToInt(o[1]) : 0
          , r = o.length > 2 ? t.strToInt(o[2]) : 0;
        return (1e4 * (864e5 * s + 36e5 * n + 6e4 * a + 1e3 * r)).toString()
    }
    ,
    e.getSingleValueForReportServer = function() {
        var A = null;
        if (e.params.isNull)
            return null;
        if ("Value" == e.params.basicType || "NullableValue" == e.params.basicType) {
            if ("Bool" == e.params.type)
                return e.controls.boolCheckBox.isChecked ? "True" : "False";
            if ("DateTime" == e.params.type)
                return e.getDateTimeForReportServer(e.params.key);
            A = e.params.allowUserValues ? e.controls.firstTextBox.value : e.params.key,
            "TimeSpan" == e.params.type && (A = e.getTimeSpanForReportServer(A))
        }
        return A
    }
    ,
    e.getRangeValuesForReportServer = function() {
        var A = {};
        return A.from = "DateTime" == e.params.type ? e.getDateTimeForReportServer(e.params.key) : "TimeSpan" == e.params.type ? e.getTimeSpanForReportServer(e.controls.firstTextBox.value) : e.controls.firstTextBox.value,
        A.to = "DateTime" == e.params.type ? e.getDateTimeForReportServer(e.params.keyTo) : "TimeSpan" == e.params.type ? e.getTimeSpanForReportServer(e.controls.secondTextBox.value) : e.controls.secondTextBox.value,
        A
    }
    ,
    e.getListValuesForReportServer = function() {
        var A = []
          , t = 0;
        for (var o in e.params.items) {
            var i = {};
            i.Ident = "Single",
            (e.params.allowUserValues || !e.params.allowUserValues && e.params.items[o].isChecked) && (i.Value = "DateTime" == e.params.type ? e.getDateTimeForReportServer(e.params.items[o].key) : "TimeSpan" == e.params.type ? e.getTimeSpanForReportServer(e.params.items[o].key) : e.params.items[o].key,
            i.Type = null == i.Value ? null : e.getSingleType(),
            A.push(i))
        }
        return A
    }
    ,
    e.getParameterObjectForReportServer = function() {
        var A = {};
        switch (A.Ident = e.params.basicType.indexOf("Value") != -1 ? "Single" : e.params.basicType,
        A.Name = e.params.name,
        A.Ident) {
        case "Single":
            A.Value = e.getSingleValueForReportServer(),
            A.Type = null == A.Value ? null : e.getSingleType();
            break;
        case "Range":
            var t = e.getRangeValuesForReportServer();
            A.FromValue = t.from,
            A.ToValue = t.to,
            A.RangeType = e.params.type + "Range",
            A.FromType = null == A.FromValue ? null : e.getSingleType(),
            A.ToType = null == A.ToValue ? null : e.getSingleType();
            break;
        case "List":
            A.ListType = e.params.type + "List",
            A.Values = e.getListValuesForReportServer()
        }
        return A
    }
    ,
    e.getSingleType = function() {
        var A = e.params.type;
        if ("DateTime" != A && "TimeSpan" != A && "Guid" != A && "Decimal" != A)
            return A.toLowerCase();
        return A
    }
    ,
    e
}
,
StiJsViewer.prototype.CreateBoolCheckBox = function(A) {
    var e = this.ParameterCheckBox(A);
    return A.controls.boolCheckBox = e,
    e.setChecked("boolean" == typeof A.params.value && A.params.value || "true" == A.params.value || "True" == A.params.value),
    e.setEnabled(A.params.allowUserValues),
    e
}
,
StiJsViewer.prototype.CreateFirstTextBox = function(A) {
    var e = this.ParameterTextBox(A);
    if (A.controls.firstTextBox = e,
    e.setReadOnly("List" == A.params.basicType || !A.params.allowUserValues),
    "Value" == A.params.basicType || "NullableValue" == A.params.basicType) {
        if ("DateTime" == A.params.type && null == A.params.value) {
            var t = this.getNowDateTimeObject(new Date);
            A.params.key = t
        }
        e.value = "DateTime" == A.params.type ? this.getStringKey(A.params.key, A) : A.params.value
    }
    if ("Range" == A.params.basicType) {
        if ("DateTime" == A.params.type && A.params.key && A.params.key.isNull) {
            var t = this.getNowDateTimeObject(new Date);
            A.params.key = t
        }
        e.value = this.getStringKey(A.params.key, A)
    }
    if ("List" == A.params.basicType)
        for (var o in A.params.items) {
            var i = !0;
            A.params.value instanceof Array && !A.params.value.contains(A.params.items[o].value) && (i = !1),
            A.params.items[o].isChecked = i,
            i && ("" != e.value && (e.value += ";"),
            A.params.allowUserValues ? e.value += this.getStringKey(A.params.items[o].key, A) : e.value += "" != A.params.items[o].value ? A.params.items[o].value : this.getStringKey(A.params.items[o].key, A))
        }
    return e
}
,
StiJsViewer.prototype.CreateFirstDateTimeButton = function(A) {
    var e = this.ParameterButton("DateTimeButton", A);
    return A.controls.firstDateTimeButton = e,
    e.action = function() {
        var A = e.jsObject.controls.datePicker;
        A.ownerValue = this.parameter.params.key,
        A.showTime = "Date" != this.parameter.params.dateTimeType,
        A.parentDataControl = this.parameter.controls.firstTextBox,
        A.parentButton = this,
        A.changeVisibleState(!A.visible)
    }
    ,
    e
}
,
StiJsViewer.prototype.CreateFirstGuidButton = function(A) {
    var e = this.ParameterButton("GuidButton", A);
    return A.controls.firstGuidButton = e,
    e.action = function() {
        this.parameter.controls.firstTextBox.value = this.parameter.jsObject.newGuid()
    }
    ,
    e
}
,
StiJsViewer.prototype.CreateSecondTextBox = function(A) {
    var e = this.ParameterTextBox(A);
    if (A.controls.secondTextBox = e,
    e.setReadOnly(!A.params.allowUserValues),
    "DateTime" == A.params.type && A.params.keyTo && A.params.keyTo.isNull) {
        var t = this.getNowDateTimeObject(new Date);
        A.params.keyTo = t
    }
    return e.value = this.getStringKey(A.params.keyTo, A),
    e
}
,
StiJsViewer.prototype.CreateSecondDateTimeButton = function(A) {
    var e = this.ParameterButton("DateTimeButton", A);
    return A.controls.secondDateTimeButton = e,
    e.action = function() {
        var A = {
            showTime: "Date" != this.parameter.params.dateTimeType,
            firstParentDataControl: this.parameter.controls.firstTextBox,
            firstParentButton: this.parameter.controls.firstDateTimeButton,
            firstOwnerValue: this.parameter.params.key,
            secondParentDataControl: this.parameter.controls.secondTextBox,
            secondParentButton: this,
            secondOwnerValue: this.parameter.params.keyTo
        }
          , t = e.jsObject.InitializeDoubleDatePicker(A);
        t.changeVisibleState(!t.visible, null, !0)
    }
    ,
    e
}
,
StiJsViewer.prototype.CreateSecondGuidButton = function(A) {
    var e = this.ParameterButton("GuidButton", A);
    return A.controls.secondGuidButton = e,
    e.action = function() {
        this.parameter.controls.secondTextBox.value = this.parameter.jsObject.newGuid()
    }
    ,
    e
}
,
StiJsViewer.prototype.CreateDropDownButton = function(A) {
    var e = this.ParameterButton("DropDownButton", A);
    return A.controls.dropDownButton = e,
    e.action = function() {
        this.parameter.changeVisibleStateMenu(null == this.parameter.menu)
    }
    ,
    e
}
,
StiJsViewer.prototype.CreateNullableCheckBox = function(A) {
    var e = this.ParameterCheckBox(A);
    return e.onChecked = function() {
        this.parameter.setEnabled(!this.isChecked)
    }
    ,
    e
}
,
StiJsViewer.prototype.InitializeParametersPanel = function() {
    if (this.controls.parametersPanel && (this.controls.parametersPanel.changeVisibleState(!1),
    this.controls.mainPanel.removeChild(this.controls.parametersPanel),
    delete this.controls.parametersPanel),
    this.options.toolbar.visible && this.options.toolbar.showParametersButton && this.controls.toolbar.controls.Parameters.setEnabled(null != this.options.paramsVariables),
    null == this.options.paramsVariables)
        return;
    var A = document.createElement("div");
    A.menus = {},
    this.controls.parametersPanel = A,
    this.controls.mainPanel.appendChild(A),
    A.className = "stiJsViewerParametersPanel",
    A.id = this.controls.viewer.id + "_ParametersPanel",
    A.style.display = "none",
    A.visible = !1,
    A.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (A.style.color = this.options.toolbar.fontColor),
    A.jsObject = this,
    A.currentOpeningParameter = null,
    A.dropDownButtonWasClicked = !1,
    A.dateTimeButtonWasClicked = !1;
    var e = document.createElement("div");
    A.appendChild(e),
    e.style.padding = "0 2px 2px 2px",
    A.style.top = this.controls.drillDownPanel.offsetHeight + (this.options.toolbar.visible ? this.controls.toolbar.offsetHeight : 0) + (this.controls.findPanel ? this.controls.findPanel.offsetHeight : 0) + "px",
    A.container = document.createElement("div"),
    e.appendChild(A.container),
    A.container.className = "stiJsViewerInnerContainerParametersPanel",
    "" != this.options.toolbar.backgroundColor && (A.container.style.background = this.options.toolbar.backgroundColor),
    "" != this.options.toolbar.borderColor && (A.container.style.border = "1px solid " + this.options.toolbar.borderColor),
    A.container.id = A.id + "Container",
    A.container.style.maxHeight = this.options.appearance.parametersPanelMaxHeight + "px",
    A.container.jsObject = this;
    var t = this.CreateHTMLTable();
    A.mainButtons = t,
    t.setAttribute("align", "right"),
    t.style.margin = "5px 0 10px 0",
    t.ID = A.id + "MainButtons",
    A.mainButtons.reset = this.FormButton("Reset", this.collections.loc.Reset, null, 80),
    A.mainButtons.submit = this.FormButton("Submit", this.collections.loc.Submit, null, 80),
    t.addCell(A.mainButtons.reset),
    t.addCell(A.mainButtons.submit).style.paddingLeft = "10px",
    this.options.isTouchDevice || (A.container.onscroll = function() {
        A.hideAllMenus()
    }
    ),
    A.changeVisibleState = function(e) {
        var t = A.jsObject.options
          , o = A.jsObject.controls;
        A.style.display = e ? "" : "none",
        A.visible = e,
        t.toolbar.visible && t.toolbar.showParametersButton && o.toolbar.controls.Parameters.setSelected(e),
        o.reportPanel.style.marginTop = ("relative" == o.reportPanel.style.position ? A.offsetHeight : o.drillDownPanel.offsetHeight + A.offsetHeight) + "px",
        null != o.bookmarksPanel && (o.bookmarksPanel.style.top = (t.toolbar.visible ? o.toolbar.offsetHeight : 0) + o.drillDownPanel.offsetHeight + (o.findPanel ? o.findPanel.offsetHeight : 0) + A.offsetHeight + "px")
    }
    ,
    A.addParameters = function() {
        var e = this.jsObject.copyObject(A.jsObject.options.paramsVariables)
          , t = this.jsObject.getCountObjects(e)
          , o = t <= 5 ? 1 : A.jsObject.options.appearance.parametersPanelColumnsCount
          , i = parseInt(t / o);
        i * o < t && i++;
        var s = document.createElement("table");
        s.cellPadding = 0,
        s.cellSpacing = 0,
        s.style.border = 0;
        var n = document.createElement("tbody");
        s.appendChild(n),
        this.container.appendChild(s);
        for (var a = {}, r = 0; r < i + 1; r++) {
            var l = document.createElement("tr");
            for (n.appendChild(l),
            h = 0; h < o; h++) {
                var c = document.createElement("td");
                c.style.padding = "0 10px 0 " + (h > 0 ? "30px" : 0),
                l.appendChild(c);
                var p = document.createElement("td");
                p.style.padding = 0,
                l.appendChild(p),
                a[r + ";" + h + "name"] = c,
                a[r + ";" + h + "controls"] = p
            }
        }
        for (var h = 0, r = 0, g = 0; g < t; g++)
            a[r + ";" + h + "name"].style.whiteSpace = "nowrap",
            a[r + ";" + h + "name"].innerHTML = e[g].alias,
            a[r + ";" + h + "controls"].appendChild(A.jsObject.CreateParameter(e[g])),
            r++,
            g == t - 1 && a[r + ";" + h + "controls"].appendChild(A.mainButtons),
            r == i && (r = 0,
            h++)
    }
    ,
    A.clearParameters = function() {
        while (A.container.childNodes[0])
            A.container.removeChild(A.container.childNodes[0])
    }
    ,
    A.getParametersValues = function() {
        parametersValues = {};
        for (var e in A.jsObject.options.parameters) {
            var t = A.jsObject.options.parameters[e];
            parametersValues[e] = t.getValue()
        }
        return parametersValues
    }
    ,
    A.hideAllMenus = function() {
        A.jsObject.options.currentMenu && A.jsObject.options.currentMenu.changeVisibleState(!1),
        A.jsObject.options.currentDatePicker && A.jsObject.options.currentDatePicker.changeVisibleState(!1)
    }
    ,
    this.options.parameters = {},
    A.addParameters(),
    A.changeVisibleState(!0)
}
,
StiJsViewer.prototype.ParameterButton = function(A, e) {
    var t = this.SmallButton(null, null, A + ".png", null, null, "stiJsViewerFormButton");
    return t.style.height = this.options.isTouchDevice ? "26px" : "21px",
    t.style.height = this.options.isTouchDevice ? "26px" : "21px",
    t.innerTable.style.width = "100%",
    t.imageCell.style.textAlign = "center",
    t.parameter = e,
    t.buttonType = A,
    t
}
,
StiJsViewer.prototype.ParameterTextBox = function(A) {
    var e = this.TextBox(null, null, null, !0);
    e.parameter = A,
    "Char" == A.params.type && (e.maxLength = 1);
    var t = "210px";
    return "Range" == A.params.basicType ? (t = "140px",
    "Guid" != A.params.type && "String" != A.params.type || (t = "190px"),
    "DateTime" == A.params.type && (t = "235px"),
    "Char" == A.params.type && (t = "60px")) : t = "Guid" == A.params.type ? "265px" : "210px",
    e.style.width = t,
    "DateTime" == A.params.type && (e.action = function() {
        if (this.oldValue == this.value)
            return;
        try {
            var A = (new Date).toLocaleTimeString()
              , t = A.toLowerCase().indexOf("am") >= 0 || A.toLowerCase().indexOf("pm") >= 0
              , o = t ? "MM/dd/yyyy" : "dd.MM.yyyy"
              , i = o + " hh:mm:ss";
            "Date" == e.parameter.params.dateTimeType && (i = o),
            "Time" == e.parameter.params.dateTimeType && (i = "hh:mm:ss");
            var s = e.jsObject.GetDateTimeFromString(this.value, i)
              , n = e.jsObject.getNowDateTimeObject(s);
            e.parameter.params[e.parameter.controls.secondTextBox == e ? "keyTo" : "key"] = n,
            e.value = e.jsObject.dateTimeObjectToString(n, e.parameter.params.dateTimeType)
        } catch (A) {
            alert(A)
        }
    }
    ),
    e
}
,
StiJsViewer.prototype.ParameterCheckBox = function(A) {
    var e = this.CheckBox();
    return e.parameter = A,
    e
}
,
StiJsViewer.prototype.ParameterMenu = function(A) {
    var e = this.BaseMenu(null, A.controls.dropDownButton, "Down", "stiJsViewerDropdownMenu");
    e.parameter = A,
    e.changeVisibleState = function(e, t) {
        var o = "stiJsViewerMainPanel";
        if (t && (this.parentButton = t,
        t.haveMenu = !0),
        e) {
            this.onshow(),
            this.style.display = "",
            this.visible = !0,
            this.style.overflow = "hidden",
            this.parentButton.setSelected(!0),
            this.jsObject.options.currentMenu = this,
            this.style.width = this.innerContent.offsetWidth + "px",
            this.style.height = this.innerContent.offsetHeight + "px",
            this.style.left = this.jsObject.FindPosX(A, o) + "px",
            this.style.top = "Down" == this.animationDirection ? this.jsObject.FindPosY(this.parentButton, o) + this.parentButton.offsetHeight + 2 + "px" : this.jsObject.FindPosY(this.parentButton, o) - this.offsetHeight + "px",
            this.innerContent.style.top = ("Down" == this.animationDirection ? -1 : 1) * this.innerContent.offsetHeight + "px",
            A.menu = this,
            d = new Date;
            var i = d.getTime();
            this.jsObject.options.toolbar.menuAnimation && (i += this.jsObject.options.menuAnimDuration),
            this.jsObject.ShowAnimationVerticalMenu(this, "Down" == this.animationDirection ? 0 : -1, i)
        } else
            this.onHide(),
            clearTimeout(this.innerContent.animationTimer),
            this.visible = !1,
            this.parentButton.setSelected(!1),
            this.style.display = "none",
            this.jsObject.controls.mainPanel.removeChild(this),
            A.menu = null,
            this.jsObject.options.currentMenu == this && (this.jsObject.options.currentMenu = null)
    }
    ;
    var t = this.CreateHTMLTable();
    return t.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (t.style.color = this.options.toolbar.fontColor),
    t.style.fontSize = "12px",
    t.style.width = A.offsetWidth - 5 + "px",
    t.className = "stiJsViewerClearAllStyles stiJsViewerParametersMenuInnerTable",
    e.innerContent.appendChild(t),
    e.innerTable = t,
    e
}
,
StiJsViewer.prototype.parameterMenuItem = function(A) {
    var e = document.createElement("div");
    e.jsObject = this,
    e.parameter = A,
    e.isOver = !1,
    e.className = "stiJsViewerParametersMenuItem",
    e.style.height = this.options.isTouchDevice ? "30px" : "24px";
    var t = this.CreateHTMLTable();
    return t.className = "stiJsViewerClearAllStyles stiJsViewerParametersMenuItemInnerTable",
    e.appendChild(t),
    e.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }
    ,
    e.onmouseenter = function() {
        this.className = "stiJsViewerParametersMenuItemOver",
        this.isOver = !0
    }
    ,
    e.onmouseleave = function() {
        this.className = "stiJsViewerParametersMenuItem",
        this.isOver = !1
    }
    ,
    e.onmousedown = function() {
        if (this.isTouchStartFlag)
            return;
        this.className = "stiJsViewerParametersMenuItemPressed"
    }
    ,
    e.ontouchstart = function() {
        var A = this;
        this.isTouchStartFlag = !0,
        clearTimeout(this.isTouchStartTimer),
        this.parameter.jsObject.options.fingerIsMoved = !1,
        this.isTouchStartTimer = setTimeout(function() {
            A.isTouchStartFlag = !1
        }, 1e3)
    }
    ,
    e.onmouseup = function() {
        if (this.isTouchEndFlag)
            return;
        this.parameter.jsObject.TouchEndMenuItem(this.id, !1)
    }
    ,
    e.ontouchend = function() {
        var A = this;
        this.isTouchEndFlag = !0,
        clearTimeout(this.isTouchEndTimer),
        this.parameter.jsObject.TouchEndMenuItem(this.id, !0),
        this.isTouchEndTimer = setTimeout(function() {
            A.isTouchEndFlag = !1
        }, 1e3)
    }
    ,
    e.innerContainer = t.addCell(),
    e.innerContainer.style.padding = "0 5px 0 5px",
    e
}
,
StiJsViewer.prototype.TouchEndMenuItem = function(A, e) {
    var t = document.getElementById(A);
    if (!t || t.parameter.jsObject.options.fingerIsMoved)
        return;
    if (e)
        return t.className = "stiJsViewerParametersMenuItemPressed",
        "undefined" != typeof event && "preventDefault"in event && event.preventDefault(),
        void setTimeout("js" + t.parameter.jsObject.controls.viewer.id + ".TouchEndMenuItem('" + t.id + "', false)", 200);
    t.className = t.isOver ? "stiJsViewerParametersMenuItemOver" : "stiJsViewerParametersMenuItem",
    null != t.action && t.action()
}
,
StiJsViewer.prototype.parameterMenuSeparator = function() {
    var A = document.createElement("Div");
    return A.className = "stiJsViewerParametersMenuSeparator",
    A
}
,
StiJsViewer.prototype.parameterMenuForValue = function(A) {
    var e = this.ParameterMenu(A);
    for (var t in A.params.items) {
        var o = e.innerTable.addCellInNextRow()
          , i = this.parameterMenuItem(A);
        o.appendChild(i),
        i.id = A.jsObject.controls.viewer.id + A.params.name + "Item" + t,
        i.parameter = A,
        i.key = A.params.items[t].key,
        i.value = A.params.items[t].value,
        i.innerContainer.innerHTML = "" != i.value && "DateTime" != A.params.type && "TimeSpan" != A.params.type && "Bool" != A.params.type ? i.value : this.getStringKey(i.key, i.parameter),
        i.action = function() {
            if (this.parameter.params.key = this.key,
            "Bool" != this.parameter.params.type ? this.parameter.controls.firstTextBox.value = "DateTime" == this.parameter.params.type || "TimeSpan" == this.parameter.params.type ? this.parameter.jsObject.getStringKey(this.key, this.parameter) : this.parameter.params.allowUserValues ? this.key : "" != this.value ? this.value : this.key : this.parameter.controls.boolCheckBox.setChecked("True" == this.key),
            this.parameter.changeVisibleStateMenu(!1),
            this.parameter.params.binding) {
                var A = {
                    action: "InitVars",
                    variables: this.jsObject.controls.parametersPanel.getParametersValues()
                };
                this.jsObject.postInteraction(A)
            }
        }
    }
    return e
}
,
StiJsViewer.prototype.parameterMenuForRange = function(A) {
    var e = this.ParameterMenu(A);
    for (var t in A.params.items) {
        var o = e.innerTable.addCellInNextRow()
          , i = this.parameterMenuItem(A);
        o.appendChild(i),
        i.id = A.jsObject.controls.viewer.id + A.params.name + "Item" + t,
        i.parameter = A,
        i.value = A.params.items[t].value,
        i.key = A.params.items[t].key,
        i.keyTo = A.params.items[t].keyTo,
        i.innerContainer.innerHTML = i.value + " [" + this.getStringKey(i.key, i.parameter) + " - " + this.getStringKey(i.keyTo, i.parameter) + "]",
        i.action = function() {
            this.parameter.params.key = this.key,
            this.parameter.params.keyTo = this.keyTo,
            this.parameter.controls.firstTextBox.value = this.parameter.jsObject.getStringKey(this.key, this.parameter),
            this.parameter.controls.secondTextBox.value = this.parameter.jsObject.getStringKey(this.keyTo, this.parameter),
            this.parameter.changeVisibleStateMenu(!1)
        }
    }
    return e
}
,
StiJsViewer.prototype.parameterMenuForNotEditList = function(A) {
    var e = this.ParameterMenu(A);
    e.menuItems = {};
    var t = !0;
    for (var o in A.params.items) {
        var i = e.innerTable.addCellInNextRow();
        menuItem = this.parameterMenuItem(A),
        i.appendChild(menuItem),
        menuItem.action = null,
        menuItem.id = A.jsObject.controls.viewer.id + A.params.name + "Item" + o,
        menuItem.parameter = A,
        menuItem.value = A.params.items[o].value,
        menuItem.key = A.params.items[o].key,
        e.menuItems[o] = menuItem;
        var s = this.CreateHTMLTable();
        menuItem.innerContainer.appendChild(s);
        var n = s.addCell()
          , a = this.ParameterCheckBox(A);
        a.style.marginRight = "5px",
        n.appendChild(a),
        a.menuParent = e,
        a.setChecked(A.params.items[o].isChecked),
        menuItem.checkBox = a,
        a.isChecked || (t = !1),
        a.onChecked = function() {
            this.parameter.params.items = {},
            this.parameter.controls.firstTextBox.value = "";
            var A = !0;
            for (var t in this.menuParent.menuItems)
                this.parameter.params.items[t] = {},
                this.parameter.params.items[t].key = this.menuParent.menuItems[t].key,
                this.parameter.params.items[t].value = this.menuParent.menuItems[t].value,
                this.parameter.params.items[t].isChecked = this.menuParent.menuItems[t].checkBox.isChecked,
                A && !this.menuParent.menuItems[t].checkBox.isChecked && (A = !1),
                this.parameter.params.items[t].isChecked && ("" != this.parameter.controls.firstTextBox.value && (this.parameter.controls.firstTextBox.value += ";"),
                this.parameter.controls.firstTextBox.value += "" != this.menuParent.menuItems[t].value ? this.menuParent.menuItems[t].value : this.parameter.jsObject.getStringKey(this.menuParent.menuItems[t].key, this.parameter));
            e.checkBoxSelectAll.setChecked(A)
        }
        ;
        var r = s.addCell();
        if (r.style.whiteSpace = "nowrap",
        r.innerHTML = "" != menuItem.value ? menuItem.value : this.getStringKey(menuItem.key, menuItem.parameter),
        o == this.getCountObjects(A.params.items) - 1) {
            var l = this.parameterMenuItem(A);
            l.id = A.jsObject.controls.viewer.id + A.params.name + "ItemClose",
            l.innerContainer.innerHTML = this.collections.loc.Close,
            l.innerContainer.style.paddingLeft = "13px",
            l.action = function() {
                this.parameter.changeVisibleStateMenu(!1)
            }
            ,
            i.appendChild(this.parameterMenuSeparator());
            var c = this.CheckBox(null, this.collections.loc.SelectAll);
            e.checkBoxSelectAll = c,
            c.style.margin = "8px 7px 8px 7px",
            i.appendChild(c),
            i.appendChild(this.parameterMenuSeparator()),
            i.appendChild(l),
            c.setChecked(t),
            c.action = function() {
                var t = this.isChecked;
                for (var o in A.params.items)
                    e.menuItems[o].checkBox.setChecked(t)
            }
        }
    }
    return e
}
,
StiJsViewer.prototype.parameterMenuForEditList = function(A) {
    var e = this.ParameterMenu(A);
    e.newItem = function(A, t) {
        var o = t.jsObject.parameterMenuItem(t);
        o.id = t.jsObject.controls.viewer.id + t.params.name + "Item" + t.jsObject.newGuid().replace(/-/g, ""),
        o.onmouseover = null,
        o.onmousedown = null,
        o.ontouchend = null,
        o.action = null,
        o.parameter = t,
        o.value = A.value,
        o.key = A.key;
        var i = o.jsObject.CreateHTMLTable();
        o.innerContainer.appendChild(i);
        var s = t.jsObject.ParameterTextBox(t);
        if (o.textBox = s,
        s.value = t.jsObject.getStringKey(o.key, o.parameter),
        s.thisMenu = e,
        i.addCell(s).style.padding = "0 1px 0 0",
        "DateTime" == t.params.type) {
            var n = t.jsObject.ParameterButton("DateTimeButton", t);
            n.id = o.id + "DateTimeButton",
            n.parameter = t,
            n.thisItem = o,
            i.addCell(n).style.padding = "0 1px 0 1px",
            n.action = function() {
                var A = n.jsObject.controls.datePicker;
                A.ownerValue = this.thisItem.key,
                A.parentDataControl = this.thisItem.textBox,
                A.parentButton = this,
                A.changeVisibleState(!A.visible)
            }
        }
        if ("Guid" == t.params.type) {
            var a = t.jsObject.ParameterButton("GuidButton", t);
            a.id = o.id + "GuidButton",
            a.thisItem = o,
            a.thisMenu = e,
            i.addCell(a).style.padding = "0 1px 0 1px",
            a.action = function() {
                this.thisItem.textBox.value = this.parameter.jsObject.newGuid(),
                this.thisMenu.updateItems()
            }
        }
        var r = t.jsObject.ParameterButton("RemoveItemButton", t);
        return r.id = o.id + "RemoveButton",
        r.itemsContainer = this.itemsContainer,
        r.thisItem = o,
        r.thisMenu = e,
        i.addCell(r).style.padding = "0 1px 0 1px",
        r.action = function() {
            this.itemsContainer.removeChild(this.thisItem),
            this.thisMenu.updateItems()
        }
        ,
        o
    }
    ,
    e.updateItems = function() {
        for (this.parameter.params.items = {},
        this.parameter.controls.firstTextBox.value = "",
        i = 0; i < this.itemsContainer.childNodes.length; i++)
            itemMenu = this.itemsContainer.childNodes[i],
            this.parameter.params.items[i] = {},
            this.parameter.params.items[i].key = "DateTime" == this.parameter.params.type ? itemMenu.key : itemMenu.textBox.value,
            this.parameter.params.items[i].value = itemMenu.value,
            "" != this.parameter.controls.firstTextBox.value && (this.parameter.controls.firstTextBox.value += ";"),
            this.parameter.controls.firstTextBox.value += this.parameter.jsObject.getStringKey(this.parameter.params.items[i].key, this.parameter);
        this.parameter.menu.innerTable.offsetHeight > 400 ? this.parameter.menu.style.height = "350px;" : this.parameter.menu.style.height = this.parameter.menu.innerTable.offsetHeight + "px"
    }
    ;
    var t = this.parameterMenuItem(A);
    e.innerTable.addCell(t),
    t.id = A.jsObject.controls.viewer.id + A.params.name + "ItemNew",
    t.innerContainer.innerHTML = this.collections.loc.NewItem,
    t.thisMenu = e,
    t.action = function() {
        var A = {};
        "DateTime" == this.parameter.params.type ? (A.key = this.parameter.jsObject.getNowDateTimeObject(),
        A.value = this.parameter.jsObject.dateTimeObjectToString(A.key, this.parameter)) : "TimeSpan" == this.parameter.params.type ? (A.key = "00:00:00",
        A.value = "00:00:00") : "Bool" == this.parameter.params.type ? (A.key = "False",
        A.value = "False") : (A.key = "",
        A.value = "");
        var e = this.thisMenu.newItem(A, this.parameter);
        this.thisMenu.itemsContainer.appendChild(e),
        "textBox"in e && e.textBox.focus(),
        this.thisMenu.updateItems()
    }
    ;
    var o = e.innerTable.addCellInNextRow();
    e.itemsContainer = o;
    for (var i in A.params.items)
        o.appendChild(e.newItem(A.params.items[i], A));
    var s = e.innerTable.addCellInNextRow()
      , n = this.parameterMenuItem(A);
    s.appendChild(n),
    n.id = A.jsObject.controls.viewer.id + A.params.name + "ItemRemoveAll",
    n.innerContainer.innerHTML = this.collections.loc.RemoveAll,
    n.thisMenu = e,
    n.action = function() {
        while (this.thisMenu.itemsContainer.childNodes[0])
            this.thisMenu.itemsContainer.removeChild(this.thisMenu.itemsContainer.childNodes[0]);
        this.thisMenu.updateItems()
    }
    ,
    s.appendChild(this.parameterMenuSeparator());
    var a = this.parameterMenuItem(A);
    return s.appendChild(a),
    a.id = A.jsObject.controls.viewer.id + A.params.name + "ItemClose",
    a.innerContainer.innerHTML = this.collections.loc.Close,
    a.action = function() {
        this.parameter.changeVisibleStateMenu(!1)
    }
    ,
    e
}
,
StiJsViewer.prototype.ReplaceMonths = function(A) {
    for (var e = 1; e <= 12; e++) {
        var t = ""
          , o = "";
        switch (e) {
        case 1:
            t = "January",
            o = this.collections.loc.MonthJanuary;
            break;
        case 2:
            t = "February",
            o = this.collections.loc.MonthFebruary;
            break;
        case 3:
            t = "March",
            o = this.collections.loc.MonthMarch;
            break;
        case 4:
            t = "April",
            o = this.collections.loc.MonthApril;
            break;
        case 5:
            t = "May",
            o = this.collections.loc.MonthMay;
            break;
        case 6:
            t = "June",
            o = this.collections.loc.MonthJune;
            break;
        case 7:
            t = "July",
            o = this.collections.loc.MonthJuly;
            break;
        case 8:
            t = "August",
            o = this.collections.loc.MonthAugust;
            break;
        case 9:
            t = "September",
            o = this.collections.loc.MonthSeptember;
            break;
        case 10:
            t = "October",
            o = this.collections.loc.MonthOctober;
            break;
        case 11:
            t = "November",
            o = this.collections.loc.MonthNovember;
            break;
        case 12:
            t = "December",
            o = this.collections.loc.MonthDecember
        }
        var i = t.substring(0, 3)
          , s = o.substring(0, 3);
        A = A.replace(t, e).replace(t.toLowerCase(), e).replace(i, e).replace(i.toLowerCase(), e),
        A = A.replace(o, e).replace(o.toLowerCase(), e).replace(s, e).replace(s.toLowerCase(), e)
    }
    return A
}
,
StiJsViewer.prototype.GetDateTimeFromString = function(A, e) {
    var t = function(A) {
        return "0123456789".indexOf(A) >= 0
    };
    if (!A)
        return new Date;
    A = this.ReplaceMonths(A);
    var o = new Date;
    null == e && (e = "dd.MM.yyyy hh:mm:ss");
    var i = 1970
      , s = 1
      , n = 1
      , a = 0
      , r = 0
      , l = 0
      , c = 0
      , p = ""
      , h = 0
      , g = [];
    while (h < A.length) {
        if (p = A.charAt(h),
        t(p)) {
            g.push(p),
            h++;
            while (h < A.length && t(A.charAt(h)))
                g[g.length - 1] += A.charAt(h),
                h++;
            g[g.length - 1] = this.StrToInt(g[g.length - 1])
        }
        h++
    }
    h = 0;
    var m = 0
      , u = -1
      , d = !1;
    while (h < e.length && u + 1 < g.length) {
        if (p = e.charAt(h),
        m = 0,
        "Y" == p || "y" == p || "M" == p || "d" == p || "h" == p || "H" == p || "m" == p || "s" == p || "f" == p || "F" == p || "t" == p || "z" == p) {
            u++;
            while (h < e.length && e.charAt(h) == p)
                h++,
                m++
        }
        switch (p) {
        case "Y":
            i = g[u];
            break;
        case "y":
            i = g[u] < 1e3 ? 2e3 + g[u] : g[u];
            break;
        case "M":
            s = g[u];
            break;
        case "d":
            n = g[u];
            break;
        case "h":
            d = !0;
        case "H":
            a = g[u];
            break;
        case "m":
            r = g[u];
            break;
        case "s":
            l = g[u];
            break;
        case "f":
        case "F":
            c = g[u];
            break;
        case "t":
            A.toLowerCase().indexOf("am") >= 0 && 12 == a && (a = 0),
            A.toLowerCase().indexOf("pm") >= 0 && a < 12 && (a += 12);
            break;
        default:
            h++
        }
    }
    return o = new Date(i,s - 1,n,a,r,l,c)
}
,
StiJsViewer.prototype.InitializeProcessImage = function() {
    var A = this.Progress();
    return A.jsObject = this,
    A.style.display = "none",
    this.controls.processImage = A,
    this.controls.mainPanel.appendChild(A),
    A.style.left = "50%",
    A.style.marginLeft = "-32px",
    this.options.appearance.fullScreenMode ? (A.style.top = "50%",
    A.style.marginTop = "-100px") : A.style.top = "250px",
    A.show = function() {
        this.style.display = ""
    }
    ,
    A.hide = function() {
        this.style.display = "none"
    }
    ,
    A
}
,
StiJsViewer.prototype.Progress = function() {
    var A = document.createElement("div");
    A.style.position = "absolute",
    A.style.zIndex = "1000";
    var e = document.createElement("div");
    return A.appendChild(e),
    e.className = "js_viewer_loader",
    A
}
,
StiJsViewer.prototype.RadioButton = function(A, e, t, o) {
    var i = this.CreateHTMLTable();
    return i.style.fontFamily = this.options.toolbar.fontFamily,
    i.jsObject = this,
    i.name = A,
    i.isEnabled = !0,
    i.isChecked = !1,
    i.groupName = e,
    i.className = "stiJsViewerRadioButton",
    i.captionText = t,
    o && i.setAttribute("title", o),
    A && (this.controls.radioButtons || (this.controls.radioButtons = {}),
    this.controls.radioButtons[A] = i),
    i.outCircle = document.createElement("div"),
    i.outCircle.className = "stiJsViewerRadioButtonOutCircle",
    i.circleCell = i.addCell(i.outCircle),
    i.innerCircle = document.createElement("div"),
    i.innerCircle.style.visibility = "hidden",
    i.innerCircle.className = "stiJsViewerRadioButtonInnerCircle",
    i.innerCircle.style.margin = this.options.isTouchDevice ? "4px" : "3px",
    i.innerCircle.style.width = this.options.isTouchDevice ? "9px" : "7px",
    i.innerCircle.style.height = this.options.isTouchDevice ? "9px" : "7px",
    i.outCircle.appendChild(i.innerCircle),
    null != t && (i.captionCell = i.addCell(),
    i.captionCell.style.paddingLeft = "4px",
    i.captionCell.style.whiteSpace = "nowrap",
    i.captionCell.innerHTML = t),
    i.lastCell = i.addCell(),
    i.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }
    ,
    i.onmouseenter = function() {
        if (!this.isEnabled)
            return;
        this.outCircle.className = "stiJsViewerRadioButtonOutCircleOver"
    }
    ,
    i.onmouseleave = function() {
        if (!this.isEnabled)
            return;
        this.outCircle.className = "stiJsViewerRadioButtonOutCircle"
    }
    ,
    i.onclick = function() {
        if (this.isTouchEndFlag || !this.isEnabled || this.jsObject.options.isTouchClick)
            return;
        i.setChecked(!0),
        i.action()
    }
    ,
    i.ontouchend = function() {
        if (!this.isEnabled || this.jsObject.options.fingerIsMoved)
            return;
        this.outCircle.className = "stiJsViewerRadioButtonOutCircleOver";
        var A = this;
        this.isTouchEndFlag = !0,
        clearTimeout(this.isTouchEndTimer),
        setTimeout(function() {
            A.outCircle.className = "stiJsViewerRadioButtonOutCircle",
            A.setChecked(!0),
            A.action()
        }, 150),
        this.isTouchEndTimer = setTimeout(function() {
            A.isTouchEndFlag = !1
        }, 1e3)
    }
    ,
    i.ontouchstart = function() {
        this.jsObject.options.fingerIsMoved = !1
    }
    ,
    i.setEnabled = function(A) {
        this.innerCircle.style.opacity = A ? "1" : "0.5",
        this.isEnabled = A,
        this.className = A ? "stiJsViewerRadioButton" : "stiJsViewerRadioButtonDisabled",
        this.outCircle.className = A ? "stiJsViewerRadioButtonOutCircle" : "stiJsViewerRadioButtonOutCircleDisabled"
    }
    ,
    i.setChecked = function(A) {
        if (this.groupName && A)
            for (var e in this.jsObject.controls.radioButtons)
                this.groupName == this.jsObject.controls.radioButtons[e].groupName && this.jsObject.controls.radioButtons[e].setChecked(!1);
        this.innerCircle.style.visibility = A ? "visible" : "hidden",
        this.isChecked = A,
        this.onChecked()
    }
    ,
    i.onChecked = function() {}
    ,
    i.action = function() {}
    ,
    i
}
,
StiJsViewer.prototype.InitializeReportPanel = function() {
    var A = document.createElement("div");
    A.id = this.controls.viewer.id + "ReportPanel",
    A.jsObject = this,
    this.controls.reportPanel = A,
    this.controls.mainPanel.appendChild(A),
    A.style.textAlign = "default" == this.options.appearance.pageAlignment ? "center" : this.options.appearance.pageAlignment,
    A.className = "stiJsViewerReportPanel",
    A.style.bottom = "0px",
    A.pages = [],
    A.addPage = function(e) {
        if (!e)
            return null;
        var t = document.createElement("DIV");
        t.jsObject = this.jsObject,
        A.appendChild(t),
        A.pages.push(t),
        t.loadContent = function(A) {
            t.style.display = "inline-block";
            var e = A[0];
            t.style.background = "Transparent" == e.background ? "White" : e.background,
            t.innerHTML = e.content
        }
        ,
        t.className = this.jsObject.options.appearance.showPageShadow ? "stiJsViewerPageShadow" : "stiJsViewerPage";
        for (var o = e.sizes.split(";"), i = e.margins.split(" "), s = [], n = 0; n < i.length; n++)
            s.push(parseInt(i[n].replace("px", "")));
        t.margins = s,
        t.pageWidth = parseInt(o[0]),
        t.pageHeight = parseInt(o[1]),
        t.style.overflow = "hidden",
        t.style.margin = "10px",
        t.style.display = "inline-block",
        t.style.verticalAlign = "top",
        t.style.padding = e.margins,
        t.style.border = "1px solid " + this.jsObject.options.appearance.pageBorderColor,
        t.style.color = "#000000",
        t.style.background = "Transparent" == e.background ? "White" : e.background,
        t.style.boxSizing = "content-box",
        t.innerHTML = e.content,
        this.jsObject.reportParams.pagesWidth = t.offsetWidth || t.pageWidth,
        this.jsObject.reportParams.pagesHeight = t.offsetHeight || t.pageHeight;
        for (var n = 0; n < t.childNodes.length; n++)
            if (t.childNodes[n].style && t.childNodes[n].style.backgroundImage) {
                t.style.backgroundImage = t.childNodes[n].style.backgroundImage,
                t.childNodes[n].style.backgroundImage = "",
                t.childNodes[n].style.backgroundColor = "";
                break
            }
        for (var n = 0; n < t.childNodes.length; n++)
            if (t.childNodes[n].style && t.childNodes[n].style.backgroundImage) {
                t.style.backgroundImage = t.childNodes[n].style.backgroundImage,
                t.childNodes[n].style.backgroundImage = "",
                t.childNodes[n].style.backgroundColor = "";
                break
            }
        if ("Div" == this.jsObject.options.appearance.reportDisplayMode || "Span" == this.jsObject.options.appearance.reportDisplayMode) {
            var a = t.getElementsByClassName("StiPageContainer");
            if (a && a.length > 0) {
                var r = a[0];
                r.style.position = "relative",
                t.style.width = t.pageWidth - t.margins[1] - t.margins[3] + "px",
                t.style.height = t.pageHeight - t.margins[0] - t.margins[2] + "px"
            }
        }
        var l = t.offsetHeight - s[0] - s[2];
        return (null == A.maxHeights[o[1]] || l > A.maxHeights[o[1]]) && (A.maxHeights[o[1]] = l),
        this.jsObject.InitializeInteractions(t),
        t
    }
    ,
    A.getZoomByPageWidth = function() {
        if (0 == this.jsObject.reportParams.pagesWidth)
            return 100;
        var A = (this.offsetWidth - 35) * this.jsObject.reportParams.zoom / this.jsObject.reportParams.pagesWidth;
        return A
    }
    ,
    A.getZoomByPageHeight = function() {
        if (0 == this.jsObject.reportParams.pagesHeight)
            return 100;
        var A = this.jsObject.options.appearance.scrollbarsMode ? Math.min(this.jsObject.controls.viewer.offsetHeight, window.innerHeight) : window.innerHeight;
        this.jsObject.controls.toolbar && (A -= this.jsObject.controls.toolbar.offsetHeight),
        this.jsObject.controls.parametersPanel && (A -= this.jsObject.controls.parametersPanel.offsetHeight);
        var e = (A - 25) * this.jsObject.reportParams.zoom / this.jsObject.reportParams.pagesHeight;
        return e
    }
    ,
    A.addPages = function() {
        if (null == this.jsObject.reportParams.pagesArray)
            return;
        A.style.top = this.jsObject.options.toolbar.visible && ("Percentage" != this.jsObject.options.viewerHeightType || this.jsObject.options.appearance.scrollbarsMode) ? this.jsObject.controls.toolbar.offsetHeight + "px" : "0px",
        this.clear(),
        this.maxHeights = {};
        var e = this.jsObject.reportParams.pagesArray.length;
        this.jsObject.controls.css || (this.jsObject.controls.css = document.getElementById(this.jsObject.options.viewerId + "Styles")),
        this.jsObject.controls.css || (this.jsObject.controls.css = document.createElement("STYLE"),
        this.jsObject.controls.css.id = this.jsObject.options.viewerId + "Styles",
        this.jsObject.controls.css.setAttribute("type", "text/css"),
        this.jsObject.controls.head.appendChild(this.jsObject.controls.css)),
        this.jsObject.controls.css.styleSheet ? this.jsObject.controls.css.styleSheet.cssText = this.jsObject.reportParams.pagesArray[e - 2] : this.jsObject.controls.css.innerHTML = this.jsObject.reportParams.pagesArray[e - 2];
        var t = document.getElementById(this.jsObject.options.viewerId + "chartScriptJsViewer");
        if (t && this.jsObject.controls.head.removeChild(t),
        this.jsObject.reportParams.pagesArray[e - 1]) {
            var o = document.createElement("Script");
            o.setAttribute("type", "text/javascript"),
            o.id = this.jsObject.options.viewerId + "chartScriptJsViewer",
            o.textContent = this.jsObject.reportParams.pagesArray[e - 1],
            this.jsObject.controls.head.appendChild(o)
        }
        for (num = 0; num <= e - 3; num++)
            var i = this.addPage(this.jsObject.reportParams.pagesArray[num]);
        A.correctHeights(),
        "function" == typeof stiEvalCharts && stiEvalCharts(),
        this.jsObject.options.editableMode && this.jsObject.ShowAllEditableFields(),
        this.jsObject.UpdateAllHyperLinks()
    }
    ,
    A.clear = function() {
        while (this.childNodes[0])
            this.removeChild(this.childNodes[0]);
        A.pages = []
    }
    ,
    A.correctHeights = function() {
        for (var e in this.childNodes)
            if (null != this.childNodes[e].pageHeight) {
                var t = A.maxHeights[this.childNodes[e].pageHeight.toString()];
                t && (this.childNodes[e].style.height = t + "px")
            }
    }
    ,
    A.ontouchstart = function() {
        this.jsObject.options.allowTouchZoom && (this.jsObject.options.firstZoomDistance = 0,
        this.jsObject.options.secondZoomDistance = 0,
        this.jsObject.options.zoomStep = 0)
    }
    ,
    A.ontouchmove = function(A) {
        "undefined" != typeof A && A.touches.length > 1 && this.jsObject.options.allowTouchZoom && ("preventDefault"in A && A.preventDefault(),
        this.jsObject.options.zoomStep++,
        0 == this.jsObject.options.firstZoomDistance && (this.jsObject.options.firstZoomDistance = Math.sqrt(Math.pow(A.touches[0].pageX - A.touches[1].pageX, 2) + Math.pow(A.touches[0].pageY - A.touches[1].pageY, 2))),
        this.jsObject.options.zoomStep > 2 && 0 == this.jsObject.options.secondZoomDistance && (this.jsObject.options.secondZoomDistance = Math.sqrt(Math.pow(A.touches[0].pageX - A.touches[1].pageX, 2) + Math.pow(A.touches[0].pageY - A.touches[1].pageY, 2)),
        this.jsObject.SetZoom(this.jsObject.options.secondZoomDistance > this.jsObject.options.firstZoomDistance)))
    }
}
,
StiJsViewer.prototype.SmallButton = function(A, e, t, o, i, s) {
    var n = document.createElement("div");
    n.style.fontFamily = this.options.toolbar.fontFamily,
    n.jsObject = this,
    n.name = A,
    n.styleName = s || "stiJsViewerStandartSmallButton",
    n.isEnabled = !0,
    n.isSelected = !1,
    n.isOver = !1,
    n.className = n.styleName + " " + n.styleName + "Default",
    n.toolTip = o,
    n.style.height = this.options.isTouchDevice ? "28px" : "23px",
    n.style.boxSizing = "content-box",
    A && (this.controls.buttons || (this.controls.buttons = {}),
    this.controls.buttons[A] = n);
    var a = this.CreateHTMLTable();
    return n.innerTable = a,
    a.style.height = "100%",
    n.appendChild(a),
    null != t && (n.image = document.createElement("img"),
    n.image.src = this.collections.images[t],
    n.imageCell = a.addCell(n.image),
    n.imageCell.style.lineHeight = "0",
    n.imageCell.style.padding = this.options.isTouchDevice && null == e ? "0 7px" : "0 3px"),
    null != e && (n.caption = a.addCell(),
    n.caption.style.padding = (i ? "1px 0 " : "1px 5px ") + (t ? "0 0" : "0 5px"),
    n.caption.style.whiteSpace = "nowrap",
    n.caption.style.textAlign = "left",
    n.caption.innerHTML = e),
    null != i && (n.arrow = document.createElement("img"),
    n.arrow.src = this.collections.images["ButtonArrow" + i + ".png"],
    a.addCell(n.arrow).style.padding = e ? "0 5px 0 5px" : this.options.isTouchDevice ? "0 7px 0 0" : "0 5px 0 2px",
    n.arrow.style.marginTop = "1px",
    n.arrow.style.verticalAlign = "baseline"),
    o && "object" != typeof o && n.setAttribute("title", o),
    n.onmouseoverAction = function() {
        if (!this.isEnabled || this.jsObject.options.isTouchClick || this.haveMenu && this.isSelected)
            return;
        this.className = this.styleName + " " + this.styleName + "Over",
        this.isOver = !0,
        !this.jsObject.options.isTouchDevice && this.jsObject.options.appearance.showTooltips && this.toolTip && "object" == typeof this.toolTip && this.jsObject.controls.toolTip.showWithDelay(this.toolTip[0], this.toolTip[1], 3 == this.toolTip.length ? this.toolTip[2].left : this.jsObject.FindPosX(this, "stiJsViewerMainPanel"), 3 == this.toolTip.length ? this.toolTip[2].top : this.jsObject.controls.toolbar.offsetHeight)
    }
    ,
    n.onmouseoutAction = function() {
        if (this.isOver = !1,
        !this.isEnabled)
            return;
        this.className = this.styleName + " " + this.styleName + (this.isSelected ? "Selected" : "Default"),
        this.jsObject.options.appearance.showTooltips && this.toolTip && "object" == typeof this.toolTip && this.jsObject.controls.toolTip.hideWithDelay()
    }
    ,
    n.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }
    ,
    n.onmouseenter = function() {
        this.onmouseoverAction()
    }
    ,
    n.onmouseleave = function() {
        this.onmouseoutAction()
    }
    ,
    n.onmousedown = function() {
        if (this.isTouchStartFlag || !this.isEnabled)
            return;
        this.jsObject.options.buttonPressed = this
    }
    ,
    n.onclick = function() {
        if (this.isTouchEndFlag || !this.isEnabled || this.jsObject.options.isTouchClick)
            return;
        this.jsObject.options.appearance.showTooltips && this.toolTip && "object" == typeof this.toolTip && this.jsObject.controls.toolTip.hide(),
        this.action()
    }
    ,
    n.ontouchend = function() {
        if (!this.isEnabled || this.jsObject.options.fingerIsMoved)
            return;
        var A = this;
        this.isTouchEndFlag = !0,
        clearTimeout(this.isTouchEndTimer);
        var e = setTimeout(function(e) {
            A.jsObject.options.buttonsTimer = null,
            A.className = A.styleName + " " + A.styleName + "Default",
            A.action()
        }, 150);
        this.jsObject.options.buttonsTimer = [this, this.className, e],
        this.className = this.styleName + " " + this.styleName + "Over",
        this.isTouchEndTimer = setTimeout(function() {
            A.isTouchEndFlag = !1
        }, 1e3)
    }
    ,
    n.ontouchstart = function() {
        var A = this;
        this.isTouchStartFlag = !0,
        clearTimeout(this.isTouchStartTimer),
        this.jsObject.options.fingerIsMoved = !1,
        this.jsObject.options.buttonPressed = this,
        this.isTouchStartTimer = setTimeout(function() {
            A.isTouchStartFlag = !1
        }, 1e3)
    }
    ,
    n.setEnabled = function(A) {
        this.image && (this.image.style.opacity = A ? "1" : "0.5"),
        this.arrow && (this.arrow.style.opacity = A ? "1" : "0.5"),
        this.isEnabled = A,
        A || this.isOver || (this.isOver = !1),
        this.className = this.styleName + " " + (A ? this.styleName + (this.isOver ? "Over" : "Default") : this.styleName + "Disabled")
    }
    ,
    n.setSelected = function(A) {
        this.isSelected = A,
        this.className = this.styleName + " " + this.styleName + (A ? "Selected" : this.isEnabled ? this.isOver ? "Over" : "Default" : "Disabled")
    }
    ,
    n.action = function() {
        this.jsObject.postAction(this.name)
    }
    ,
    n
}
,
StiJsViewer.prototype.TextArea = function(A, e, t) {
    var o = document.createElement("textarea");
    o.style.width = e + "px",
    o.style.height = t + "px",
    o.style.minWidth = e + "px",
    o.style.minHeight = t + "px",
    o.jsObject = this,
    o.name = A,
    o.isEnabled = !0,
    o.isSelected = !1,
    o.isOver = !1;
    var i = "stiJsViewerTextBox";
    return o.className = i + " " + i + "Default",
    A && (this.controls.textBoxes || (this.controls.textBoxes = {}),
    this.controls.textBoxes[A] = o),
    o.setEnabled = function(A) {
        this.isEnabled = A,
        this.disabled = !A,
        this.className = i + " " + i + (A ? "Default" : "Disabled")
    }
    ,
    o.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }
    ,
    o.onmouseenter = function() {
        if (!this.isEnabled || this.readOnly)
            return;
        this.isOver = !0,
        this.isSelected || this.isFocused || (this.className = i + " " + i + "Over")
    }
    ,
    o.onfocus = function() {
        this.jsObject.options.controlsIsFocused = !0
    }
    ,
    o.onmouseleave = function() {
        if (!this.isEnabled || this.readOnly)
            return;
        this.isOver = !1,
        this.isSelected || this.isFocused || (this.className = i + " " + i + "Default")
    }
    ,
    o.setSelected = function(A) {
        this.isSelected = A,
        this.className = i + " " + i + (A ? "Over" : this.isEnabled ? this.isOver ? "Over" : "Default" : "Disabled")
    }
    ,
    o.onblur = function() {
        this.jsObject.options.controlsIsFocused = !1,
        this.action()
    }
    ,
    o.action = function() {}
    ,
    o
}
,
StiJsViewer.prototype.TextBox = function(A, e, t, o) {
    var i = document.createElement("input");
    if (i.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (i.style.color = this.options.toolbar.fontColor),
    e && (i.style.width = e + "px"),
    i.jsObject = this,
    i.name = A,
    i.isEnabled = !0,
    i.isSelected = !1,
    i.isFocused = !1,
    i.isOver = !1,
    i.actionLostFocus = o,
    t)
        try {
            i.setAttribute("title", t)
        } catch (A) {}
    i.style.height = this.options.isTouchDevice ? "26px" : "21px",
    i.style.lineHeight = i.style.height,
    i.style.boxSizing = "content-box";
    var s = "stiJsViewerTextBox";
    return i.className = s + " " + s + "Default",
    A && (this.controls.textBoxes || (this.controls.textBoxes = {}),
    this.controls.textBoxes[A] = i),
    i.setEnabled = function(A) {
        this.isEnabled = A,
        this.disabled = !A,
        this.className = s + " " + s + (A ? "Default" : "Disabled")
    }
    ,
    i.onmouseover = function() {
        this.jsObject.options.isTouchDevice || this.onmouseenter()
    }
    ,
    i.onmouseenter = function() {
        if (!this.isEnabled || this.readOnly)
            return;
        this.isOver = !0,
        this.isSelected || this.isFocused || (this.className = s + " " + s + "Over")
    }
    ,
    i.onmouseleave = function() {
        if (!this.isEnabled || this.readOnly)
            return;
        this.isOver = !1,
        this.isSelected || this.isFocused || (this.className = s + " " + s + "Default")
    }
    ,
    i.setSelected = function(A) {
        this.isSelected = A,
        this.className = s + " " + s + (A ? "Over" : this.isEnabled ? this.isOver ? "Over" : "Default" : "Disabled")
    }
    ,
    i.setReadOnly = function(A) {
        this.style.cursor = A ? "default" : "",
        this.readOnly = A;
        try {
            this.setAttribute("unselectable", A ? "on" : "off"),
            this.setAttribute("onselectstart", A ? "return false" : "")
        } catch (A) {}
    }
    ,
    i.onfocus = function() {
        this.isFocused = !0,
        this.setSelected(!0),
        this.oldValue = this.value
    }
    ,
    i.onblur = function() {
        this.isFocused = !1,
        this.setSelected(!1),
        this.action()
    }
    ,
    i.onkeypress = function(A) {
        if (this.readOnly)
            return !1;
        if (A && 13 == A.keyCode)
            return "blur"in this && this.actionLostFocus ? this.blur() : this.action(),
            !1
    }
    ,
    i.action = function() {}
    ,
    i
}
,
StiJsViewer.prototype.InitializeToolBar = function() {
    var A = document.createElement("div");
    A.controls = {},
    A.shortType = !1,
    A.minWidth = 0,
    this.controls.toolbar = A,
    this.controls.mainPanel.appendChild(A),
    A.jsObject = this,
    A.className = "stiJsViewerToolBar",
    this.options.toolbar.visible || (A.style.height = "0px",
    A.style.width = "0px");
    var e = document.createElement("div");
    A.innerContent = e,
    A.appendChild(e),
    e.style.padding = "2px";
    var t = this.CreateHTMLTable();
    e.appendChild(t),
    t.className = "stiJsViewerToolBarTable",
    t.style.margin = 0,
    "" != this.options.toolbar.backgroundColor && (t.style.background = this.options.toolbar.backgroundColor),
    "" != this.options.toolbar.borderColor && (t.style.border = "1px solid " + this.options.toolbar.borderColor),
    "" != this.options.toolbar.fontColor && (t.style.color = this.options.toolbar.fontColor),
    t.style.fontFamily = this.options.toolbar.fontFamily;
    var o = t.addCell()
      , i = t.addCell()
      , s = this.options.appearance.rightToLeft ? i : o
      , n = this.options.appearance.rightToLeft ? o : i;
    s.style.width = "100%";
    var a = this.CreateHTMLTable()
      , r = this.CreateHTMLTable();
    s.appendChild(a),
    n.appendChild(r),
    a.setAttribute("align", this.options.appearance.rightToLeft ? "right" : "default" == this.options.toolbar.alignment ? "left" : this.options.toolbar.alignment),
    a.style.margin = "1px",
    r.style.margin = "1px",
    this.options.exports.showExportToPowerPoint || this.options.exports.showExportToPdf || this.options.exports.showExportToXps || this.options.exports.showExportToOpenDocumentWriter || this.options.exports.showExportToOpenDocumentCalc || this.options.exports.showExportToText || this.options.exports.showExportToRtf || this.options.exports.showExportToWord2007 || this.options.exports.showExportToCsv || this.options.exports.showExportToDbf || this.options.exports.showExportToXml || this.options.exports.showExportToDif || this.options.exports.showExportToSylk || this.options.exports.showExportToExcel || this.options.exports.showExportToExcel2007 || this.options.exports.showExportToExcelXml || this.options.exports.showExportToHtml || this.options.exports.showExportToHtml5 || this.options.exports.showExportToMht || this.options.exports.showExportToImageBmp || this.options.exports.showExportToImageGif || this.options.exports.showExportToImageJpeg || this.options.exports.showExportToImageMetafile || this.options.exports.showExportToImagePcx || this.options.exports.showExportToImagePng || this.options.exports.showExportToImageTiff || this.options.exports.showExportToImageSvg || this.options.exports.showExportToImageSvgz || (this.options.exports.showExportToDocument || (this.options.toolbar.showSaveButton = !1),
    this.options.toolbar.showSendEmailButton = !1);
    var l = !0
      , c = [];
    this.options.toolbar.showAboutButton && c.push(["About", null, "About.png", !1]),
    this.options.toolbar.showAboutButton && this.options.toolbar.showDesignButton && c.push(["Separator1"]),
    this.options.toolbar.showDesignButton && c.push(["Design", this.collections.loc.Design, "Design.png", !1]),
    this.options.toolbar.showPrintButton && (c.push(["Print", this.collections.loc.Print, "Print.png", !0]),
    l = !1),
    this.options.toolbar.showSaveButton && (c.push(["Save", this.collections.loc.Save, "Save.png", !0]),
    l = !1),
    this.options.toolbar.showSendEmailButton && (c.push(["SendEmail", this.collections.loc.SendEmail, "SendEmail.png", !0]),
    l = !1),
    (this.options.toolbar.showBookmarksButton || this.options.toolbar.showParametersButton) && (l || c.push(["Separator2"]),
    l = !1),
    this.options.toolbar.showBookmarksButton && (c.push(["Bookmarks", null, "Bookmarks.png", !0]),
    l = !1),
    this.options.toolbar.showParametersButton && (c.push(["Parameters", null, "Parameters.png", !0]),
    l = !1),
    (this.options.toolbar.showFindButton || this.options.toolbar.showEditorButton) && (l || c.push(["Separator2_1"]),
    l = !1),
    this.options.toolbar.showFindButton && (c.push(["Find", null, "Find.png", !0]),
    l = !1),
    this.options.toolbar.showEditorButton && (c.push(["Editor", null, "Editor.png", !0]),
    l = !1),
    (this.options.toolbar.showFirstPageButton || this.options.toolbar.showPreviousPageButton || this.options.toolbar.showNextPageButton || this.options.toolbar.showLastPageButton || this.options.toolbar.showCurrentPageControl) && (l || c.push(["Separator3"]),
    l = !1),
    this.options.toolbar.showFirstPageButton && (c.push(["FirstPage", null, this.options.appearance.rightToLeft ? "LastPage.png" : "FirstPage.png", !0]),
    l = !1),
    this.options.toolbar.showPreviousPageButton && (c.push(["PrevPage", null, this.options.appearance.rightToLeft ? "NextPage.png" : "PrevPage.png", !0]),
    l = !1),
    this.options.toolbar.showCurrentPageControl && (c.push(["PageControl"]),
    l = !1),
    this.options.toolbar.showNextPageButton && (c.push(["NextPage", null, this.options.appearance.rightToLeft ? "PrevPage.png" : "NextPage.png", !0]),
    l = !1),
    this.options.toolbar.showLastPageButton && (c.push(["LastPage", null, this.options.appearance.rightToLeft ? "FirstPage.png" : "LastPage.png", !0]),
    l = !1),
    (this.options.toolbar.showViewModeButton || this.options.toolbar.showZoomButton) && (l || c.push(["Separator4"]),
    l = !1),
    this.options.toolbar.showFullScreenButton && (c.push(["FullScreen", null, "FullScreen.png", !0]),
    c.push(["Separator5"]),
    l = !1),
    this.options.toolbar.showZoomButton && (c.push(["Zoom", "100%", "Zoom.png", !0]),
    l = !1),
    this.options.toolbar.showViewModeButton && (c.push(["ViewMode", this.collections.loc.OnePage, "ViewMode.png", !0]),
    l = !1),
    "undefined" != typeof this.options.toolbar.multiPageWidthCount && (this.reportParams.multiPageWidthCount = this.options.toolbar.multiPageWidthCount),
    "undefined" != typeof this.options.toolbar.multiPageHeightCount && (this.reportParams.multiPageHeightCount = this.options.toolbar.multiPageHeightCount),
    this.options.appearance.rightToLeft || "right" != this.options.toolbar.alignment || !this.options.toolbar.showAboutButton && !this.options.toolbar.showDesignButton || c.push(["Separator6"]);
    for (var p = 0; p < c.length; p++) {
        var h = this.options.appearance.rightToLeft ? c.length - 1 - p : p
          , g = c[h][0]
          , m = "About" == g || "Design" == g || "Separator1" == g ? r : a;
        if (0 == g.indexOf("Separator")) {
            m.addCell(this.ToolBarSeparator());
            continue
        }
        var u = "Print" == g && "Default" == this.options.toolbar.printDestination || "Save" == g || "SendEmail" == g || "Zoom" == g || "ViewMode" == g ? "Down" : null
          , d = "PageControl" != g ? this.SmallButton(g, c[h][1], c[h][2], c[h][3] ? [this.collections.loc[g + "ToolTip"], this.helpLinks[g]] : null, u) : this.PageControl();
        d.caption && (d.caption.style.display = this.options.toolbar.showButtonCaptions ? "" : "none"),
        "Editor" == g && (d.style.display = "none"),
        d.style.margin = "Design" == g ? "1px 5px 1px 5px" : "1px",
        A.controls[g] = d,
        m.addCell(d)
    }
    if ("Hover" == this.options.toolbar.showMenuMode)
        for (var B = ["Print", "Save", "SendEmail", "Zoom", "ViewMode"], p = 0; p < B.length; p++) {
            var w = A.controls[B[p]];
            w && (w.onmouseover = function() {
                var A = this.jsObject.lowerFirstChar(this.name) + "Menu";
                if (clearTimeout(this.jsObject.options.toolbar["hideTimer" + this.name + "Menu"]),
                this.jsObject.options.isTouchDevice || !this.isEnabled || this.haveMenu && this.isSelected)
                    return;
                this.className = this.styleName + " " + this.styleName + "Over",
                this.jsObject.controls.menus[A].changeVisibleState(!0)
            }
            ,
            w.onmouseout = function() {
                var A = this.jsObject.lowerFirstChar(this.name) + "Menu";
                this.jsObject.options.toolbar["hideTimer" + this.name + "Menu"] = setTimeout(function() {
                    w.jsObject.controls.menus[A].changeVisibleState(!1)
                }, this.jsObject.options.menuHideDelay)
            }
            )
        }
    A.haveScroll = function() {
        return A.scrollWidth > A.offsetWidth
    }
    ,
    A.getMinWidth = function() {
        var A = s.offsetWidth
          , e = a.offsetWidth
          , o = t.offsetWidth;
        return o - (A - e) + 50
    }
    ,
    A.minWidth = A.getMinWidth(),
    A.changeToolBarState = function() {
        var e = A.jsObject.reportParams
          , t = A.controls
          , o = A.jsObject.collections;
        if (t.FirstPage && t.FirstPage.setEnabled(e.pageNumber > 0 && "OnePage" == e.viewMode),
        t.PrevPage && t.PrevPage.setEnabled(e.pageNumber > 0 && "OnePage" == e.viewMode),
        t.NextPage && t.NextPage.setEnabled(e.pageNumber < e.pagesCount - 1 && "OnePage" == e.viewMode),
        t.LastPage && t.LastPage.setEnabled(e.pageNumber < e.pagesCount - 1 && "OnePage" == e.viewMode),
        t.ViewMode && (t.ViewMode.caption.innerHTML = o.loc[e.viewMode]),
        t.Zoom && (t.Zoom.caption.innerHTML = e.zoom + "%"),
        t.PageControl && (t.PageControl.countLabel.innerHTML = e.pagesCount,
        t.PageControl.textBox.value = e.pageNumber + 1,
        t.PageControl.textBox.setEnabled(!(e.pagesCount <= 1 || "WholeReport" == e.viewMode))),
        A.jsObject.controls.menus.zoomMenu) {
            var i = A.jsObject.controls.menus.zoomMenu.items;
            for (var s in i) {
                if (null == i[s].image)
                    continue;
                "ZoomOnePage" != i[s].name && "ZoomPageWidth" != i[s].name && (i[s].image.style.visibility = i[s].name == "Zoom" + e.zoom ? "visible" : "hidden")
            }
        }
    }
    ,
    A.changeShortType = function() {
        if (A.shortType && A.jsObject.controls.viewer.offsetWidth < A.minWidth)
            return;
        A.shortType = A.jsObject.controls.viewer.offsetWidth < A.minWidth,
        shortButtons = ["Print", "Save", "Zoom", "ViewMode", "Design"];
        for (var e in shortButtons)
            w = A.controls[shortButtons[e]],
            w && w.caption && (w.caption.style.display = A.shortType ? "none" : "")
    }
    ,
    A.setEnabled = function(e) {
        e ? A.disabledPanel && (A.removeChild(A.disabledPanel),
        A.disabledPanel = null) : A.disabledPanel || (A.disabledPanel = document.createElement("div"),
        A.disabledPanel.className = "stiJsViewerDisabledPanel",
        A.appendChild(A.disabledPanel))
    }
    ,
    window.onresize = function() {}
    ,
    A.controls.Bookmarks && A.controls.Bookmarks.setEnabled(!1),
    A.controls.Parameters && A.controls.Parameters.setEnabled(!1)
}
,
StiJsViewer.prototype.ToolBarSeparator = function() {
    var A = document.createElement("div");
    return A.style.width = "1px",
    A.style.height = this.options.isTouchDevice ? "26px" : "21px",
    A.className = "stiJsViewerToolBarSeparator",
    A
}
,
StiJsViewer.prototype.PageControl = function() {
    var A = this.CreateHTMLTable()
      , e = A.addCell();
    e.style.padding = "0 2px 0 0",
    e.innerHTML = this.collections.loc.Page;
    var t = this.TextBox("PageControl", 45);
    A.addCell(t),
    A.textBox = t,
    t.action = function() {
        t.jsObject.options.pageNumber != t.getCorrectValue() - 1 && t.jsObject.postAction("GoToPage")
    }
    ,
    t.getCorrectValue = function() {
        return value = parseInt(this.value),
        (value < 1 || !value) && (value = 1),
        value > t.jsObject.reportParams.pagesCount && (value = t.jsObject.reportParams.pagesCount),
        value
    }
    ;
    var o = A.addCell();
    o.style.padding = "0 2px 0 2px",
    o.innerHTML = this.collections.loc.PageOf;
    var i = A.addCell();
    return A.countLabel = i,
    i.style.padding = "0 2px 0 0",
    i.innerHTML = "?",
    A
}
,
StiJsViewer.prototype.InitializeToolTip = function() {
    var A = document.createElement("div");
    A.id = this.controls.viewer.id + "ToolTip",
    A.jsObject = this,
    this.controls.toolTip = A,
    this.controls.mainPanel.appendChild(A),
    A.className = "stiJsViewerToolTip",
    A.style.display = "none",
    A.showTimer = null,
    A.hideTimer = null,
    A.visible = !1,
    A.innerTable = this.CreateHTMLTable(),
    A.appendChild(A.innerTable),
    A.textCell = A.innerTable.addCell(),
    A.textCell.className = "stiJsViewerToolTipTextCell",
    this.options.appearance.showTooltipsHelp ? (A.helpButton = this.SmallButton(null, this.collections.loc.TellMeMore, "HelpIcon.png", null, null, "stiJsViewerHyperlinkButton"),
    A.innerTable.addCellInNextRow(A.helpButton),
    A.helpButton.style.margin = "4px 8px 4px 8px") : A.textCell.style.border = 0,
    A.show = function(A, e, t, o) {
        if (this.visible && A == this.textCell.innerHTML || this.jsObject.options.isTouchDevice)
            return;
        this.hide(),
        this.jsObject.options.appearance.showTooltipsHelp && (this.helpButton.helpUrl = e,
        this.helpButton.action = function() {
            this.jsObject.showHelpWindow(this.helpUrl)
        }
        ),
        this.textCell.innerHTML = A,
        this.style.left = t + "px",
        this.style.top = o + "px";
        var i = new Date
          , s = i.getTime() + 300;
        this.style.opacity = 1 / 100,
        this.style.display = "",
        this.visible = !0,
        this.jsObject.ShowAnimationForm(this, s)
    }
    ,
    A.showWithDelay = function(A, e, t, o) {
        clearTimeout(this.showTimer),
        clearTimeout(this.hideTimer);
        var i = this;
        this.showTimer = setTimeout(function() {
            i.show(A, e, t, o)
        }, 300)
    }
    ,
    A.hide = function() {
        this.visible = !1,
        clearTimeout(this.showTimer),
        this.style.display = "none"
    }
    ,
    A.hideWithDelay = function() {
        clearTimeout(this.showTimer),
        clearTimeout(this.hideTimer);
        var A = this;
        this.hideTimer = setTimeout(function() {
            A.hide()
        }, 500)
    }
    ,
    A.onmouseover = function() {
        clearTimeout(this.showTimer),
        clearTimeout(this.hideTimer)
    }
    ,
    A.onmouseout = function() {
        this.hideWithDelay()
    }
}
,
StiJsViewer.prototype.BaseForm = function(A, e, t) {
    var o = document.createElement("div");
    o.name = A,
    o.id = this.generateKey(),
    o.className = "stiJsViewerForm",
    o.jsObject = this,
    o.level = t,
    o.caption = null,
    o.visible = !1,
    o.style.display = "none",
    null == t && (t = 1),
    o.style.zIndex = 10 * t + 1,
    A && (this.controls.forms || (this.controls.forms = {}),
    null != this.controls.forms[A] && (this.controls.forms[A].changeVisibleState(!1),
    this.controls.mainPanel.removeChild(this.controls.forms[A])),
    this.controls.forms[A] = o),
    this.controls.mainPanel.appendChild(o),
    o.header = document.createElement("div"),
    o.header.thisForm = o,
    o.appendChild(o.header),
    o.header.className = "stiJsViewerFormHeader";
    var i = this.CreateHTMLTable();
    i.style.width = "100%",
    o.header.appendChild(i),
    o.caption = i.addCell(),
    null != e && (e && (o.caption.innerHTML = e),
    o.caption.style.textAlign = "left",
    o.caption.style.padding = "5px 10px 8px 15px"),
    o.buttonClose = this.SmallButton(null, null, "CloseForm.png"),
    o.buttonClose.style.display = "inline-block",
    o.buttonClose.form = o,
    o.buttonClose.action = function() {
        this.form.changeVisibleState(!1)
    }
    ;
    var s = i.addCell(o.buttonClose);
    s.style.verticalAlign = "top",
    s.style.width = "30px",
    s.style.textAlign = "right",
    s.style.padding = "2px 1px 1px 1px",
    o.container = document.createElement("div"),
    o.appendChild(o.container),
    o.container.className = "stiJsViewerFormContainer",
    o.buttonsSeparator = this.FormSeparator(),
    o.appendChild(o.buttonsSeparator),
    o.buttonsPanel = document.createElement("div"),
    o.appendChild(o.buttonsPanel),
    o.buttonsPanel.className = "stiJsViewerFormButtonsPanel";
    var n = this.CreateHTMLTable();
    return o.buttonsPanel.appendChild(n),
    o.buttonOk = this.FormButton(null, this.collections.loc.ButtonOk),
    o.buttonOk.action = function() {
        o.action()
    }
    ,
    n.addCell(o.buttonOk).style.padding = "8px",
    o.buttonCancel = this.FormButton(null, this.collections.loc.ButtonCancel),
    o.buttonCancel.action = function() {
        o.changeVisibleState(!1)
    }
    ,
    n.addCell(o.buttonCancel).style.padding = "8px 8px 8px 0",
    o.changeVisibleState = function(A) {
        if (A) {
            this.style.display = "",
            this.onshow(),
            this.jsObject.setObjectToCenter(this, 150),
            this.jsObject.controls.disabledPanels[this.level].changeVisibleState(!0),
            this.visible = !0,
            d = new Date;
            var e = d.getTime() + this.jsObject.options.formAnimDuration;
            this.flag = !1,
            this.jsObject.ShowAnimationForm(this, e)
        } else
            clearTimeout(this.animationTimer),
            this.visible = !1,
            this.style.display = "none",
            this.onhide(),
            this.jsObject.controls.disabledPanels[this.level].changeVisibleState(!1)
    }
    ,
    o.action = function() {}
    ,
    o.onshow = function() {}
    ,
    o.onhide = function() {}
    ,
    o.onmousedown = function() {
        if (this.isTouchStartFlag)
            return;
        this.ontouchstart(!0)
    }
    ,
    o.ontouchstart = function(A) {
        var e = this;
        this.isTouchStartFlag = !A,
        clearTimeout(this.isTouchStartTimer),
        this.jsObject.options.formPressed = this,
        this.isTouchStartTimer = setTimeout(function() {
            e.isTouchStartFlag = !1
        }, 1e3)
    }
    ,
    o.header.onmousedown = function(A) {
        if (!A || this.isTouchStartFlag)
            return;
        var e = A.clientX
          , t = A.clientY
          , o = this.thisForm.jsObject.FindPosX(this.thisForm, "stiJsViewerMainPanel")
          , i = this.thisForm.jsObject.FindPosY(this.thisForm, "stiJsViewerMainPanel");
        this.thisForm.jsObject.options.formInDrag = [e, t, o, i, this.thisForm]
    }
    ,
    o.header.ontouchstart = function(A) {
        var e = this;
        this.isTouchStartFlag = !0,
        clearTimeout(this.isTouchStartTimer);
        var t = A.touches[0].pageX
          , o = A.touches[0].pageY
          , i = this.thisForm.jsObject.FindPosX(this.thisForm, "stiJsViewerMainPanel")
          , s = this.thisForm.jsObject.FindPosY(this.thisForm, "stiJsViewerMainPanel");
        this.thisForm.jsObject.options.formInDrag = [t, o, i, s, this.thisForm],
        this.isTouchStartTimer = setTimeout(function() {
            e.isTouchStartFlag = !1
        }, 1e3)
    }
    ,
    o.header.ontouchmove = function(A) {
        if (A.preventDefault(),
        this.thisForm.jsObject.options.formInDrag) {
            var e = this.thisForm.jsObject.options.formInDrag
              , t = e[2]
              , o = e[3]
              , i = A.touches[0].pageX
              , s = A.touches[0].pageY
              , n = e[0] - i
              , a = e[1] - s
              , r = t - n
              , l = o - a;
            e[4].style.left = r + "px",
            e[4].style.top = l + "px"
        }
    }
    ,
    o.header.ontouchend = function() {
        event.preventDefault(),
        this.thisForm.jsObject.options.formInDrag = !1
    }
    ,
    o.move = function(A) {
        var e = this.jsObject.options.formInDrag[2] + (A.clientX - this.jsObject.options.formInDrag[0])
          , t = this.jsObject.options.formInDrag[3] + (A.clientY - this.jsObject.options.formInDrag[1]);
        this.style.left = e > 0 ? e + "px" : 0,
        this.style.top = t > 0 ? t + "px" : 0
    }
    ,
    o
}
,
StiJsViewer.prototype.FormSeparator = function() {
    var A = document.createElement("div");
    return A.className = "stiJsViewerFormSeparator",
    A
}
,
StiJsViewer.prototype.InitializeExportForm = function() {
    var A = this.BaseForm("exportForm", this.collections.loc.ExportFormTitle, 1);
    A.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (A.style.color = this.options.toolbar.fontColor),
    A.style.fontSize = "12px",
    A.controls = {},
    A.labels = {},
    A.container.style.padding = "3px",
    A.addControlToParentControl = function(e, t, o, i) {
        null == o.innerTable && (o.innerTable = A.jsObject.CreateHTMLTable(),
        o.innerTable.style.width = "100%",
        o.appendChild(o.innerTable)),
        t.parentRow = o.innerTable.addRow();
        var s = o.innerTable.addCellInLastRow()
          , n = null != e ? o.innerTable.addCellInLastRow() : s;
        if (null != e) {
            s.style.padding = "0 8px 0 8px",
            s.style.minWidth = "150px",
            e && (s.innerHTML = e),
            A.labels[i] = s;
            var a = t.getAttribute("title");
            null != a && s.setAttribute("title", a)
        } else
            n.setAttribute("colspan", "2");
        n.appendChild(t)
    }
    ;
    for (var e = "8px", t = [["SavingReportGroup", null, this.GroupPanel(this.collections.loc.SavingReport, !0, 390, "4px 0 4px 0"), null, "4px"], ["SaveReportMdc", null, this.RadioButton(A.name + "SaveReportMdc", A.name + "SavingReportGroup", this.collections.loc.SaveReportMdc, null), "SavingReportGroup.container", "6px " + e + " 3px " + e], ["SaveReportMdz", null, this.RadioButton(A.name + "SaveReportMdz", A.name + "SavingReportGroup", this.collections.loc.SaveReportMdz, null), "SavingReportGroup.container", "3px " + e + " 3px " + e], ["SaveReportMdx", null, this.RadioButton(A.name + "SaveReportMdx", A.name + "SavingReportGroup", this.collections.loc.SaveReportMdx, null), "SavingReportGroup.container", "3px " + e + " 0px " + e], ["SaveReportPassword", this.collections.loc.PasswordSaveReport, this.TextBox(null, 140, this.collections.loc.PasswordSaveReportTooltip), "SavingReportGroup.container", "4px " + e + " 0px " + e], ["PageRangeGroup", null, this.GroupPanel(this.collections.loc.PagesRange, !0, 390, "4px 0 4px 0"), null, "4px"], ["PageRangeAll", null, this.RadioButton(A.name + "PagesRangeAll", A.name + "PageRangeGroup", this.collections.loc.PagesRangeAll, this.collections.loc.PagesRangeAllTooltip), "PageRangeGroup.container", "6px " + e + " 6px " + e], ["PageRangeCurrentPage", null, this.RadioButton(A.name + "PagesRangeCurrentPage", A.name + "PageRangeGroup", this.collections.loc.PagesRangeCurrentPage, this.collections.loc.PagesRangeCurrentPageTooltip), "PageRangeGroup.container", "0px " + e + " 4px " + e], ["PageRangePages", null, this.RadioButton(A.name + "PagesRangePages", A.name + "PageRangeGroup", this.collections.loc.PagesRangePages, this.collections.loc.PagesRangePagesTooltip), "PageRangeGroup.container", "0px " + e + " 0px " + e], ["PageRangePagesText", null, this.TextBox(null, 130, this.collections.loc.PagesRangePagesTooltip), "PageRangePages.lastCell", "0 0 0 30px"], ["SettingsGroup", null, this.GroupPanel(this.collections.loc.SettingsGroup, !0, 390, "4px 0 4px 0"), null, "4px"], ["ImageType", this.collections.loc.Type, this.DropDownListForExportForm(null, 160, this.collections.loc.TypeTooltip, this.GetImageTypesItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["DataType", this.collections.loc.Type, this.DropDownListForExportForm(null, 160, this.collections.loc.TypeTooltip, this.GetDataTypesItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["ExcelType", this.collections.loc.Type, this.DropDownListForExportForm(null, 160, this.collections.loc.TypeTooltip, this.GetExcelTypesItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["HtmlType", this.collections.loc.Type, this.DropDownListForExportForm(null, 160, this.collections.loc.TypeTooltip, this.GetHtmlTypesItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["Zoom", this.collections.loc.ZoomHtml, this.DropDownListForExportForm(null, 160, this.collections.loc.ZoomHtmlTooltip, this.GetZoomItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["ImageFormatForHtml", this.collections.loc.ImageFormatForHtml, this.DropDownListForExportForm(null, 160, this.collections.loc.ImageFormatForHtmlTooltip, this.GetImageFormatForHtmlItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["ExportMode", this.collections.loc.ExportMode, this.DropDownListForExportForm(null, 160, this.collections.loc.ExportModeTooltip, this.GetExportModeItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["CompressToArchive", null, this.CheckBox(null, this.collections.loc.CompressToArchive, this.collections.loc.CompressToArchiveTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["UseEmbeddedImages", null, this.CheckBox(null, this.collections.loc.EmbeddedImageData, this.collections.loc.EmbeddedImageDataTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["AddPageBreaks", null, this.CheckBox(null, this.collections.loc.AddPageBreaks, this.collections.loc.AddPageBreaksTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["ImageResolution", this.collections.loc.ImageResolution, this.DropDownListForExportForm(null, 160, this.collections.loc.ImageResolutionTooltip, this.GetImageResolutionItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["ImageCompressionMethod", this.collections.loc.ImageCompressionMethod, this.DropDownListForExportForm(null, 160, this.collections.loc.ImageCompressionMethodTooltip, this.GetImageCompressionMethodItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["AllowEditable", this.collections.loc.AllowEditable, this.DropDownListForExportForm(null, 160, this.collections.loc.AllowEditableTooltip, this.GetAllowEditableItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["ImageQuality", this.collections.loc.ImageQuality, this.DropDownListForExportForm(null, 160, this.collections.loc.ImageQualityTooltip, this.GetImageQualityItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["ContinuousPages", null, this.CheckBox(null, this.collections.loc.ContinuousPages, this.collections.loc.ContinuousPagesTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["StandardPdfFonts", null, this.CheckBox(null, this.collections.loc.StandardPDFFonts, this.collections.loc.StandardPDFFontsTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["EmbeddedFonts", null, this.CheckBox(null, this.collections.loc.EmbeddedFonts, this.collections.loc.EmbeddedFontsTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["UseUnicode", null, this.CheckBox(null, this.collections.loc.UseUnicode, this.collections.loc.UseUnicodeTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["Compressed", null, this.CheckBox(null, this.collections.loc.Compressed, this.collections.loc.CompressedTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["ExportRtfTextAsImage", null, this.CheckBox(null, this.collections.loc.ExportRtfTextAsImage, this.collections.loc.ExportRtfTextAsImageTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["PdfACompliance", null, this.CheckBox(null, this.collections.loc.PdfACompliance, this.collections.loc.PdfAComplianceTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["KillSpaceLines", null, this.CheckBox(null, this.collections.loc.KillSpaceLines, this.collections.loc.KillSpaceLinesTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["PutFeedPageCode", null, this.CheckBox(null, this.collections.loc.PutFeedPageCode, this.collections.loc.PutFeedPageCodeTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["DrawBorder", null, this.CheckBox(null, this.collections.loc.DrawBorder, this.collections.loc.DrawBorderTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["CutLongLines", null, this.CheckBox(null, this.collections.loc.CutLongLines, this.collections.loc.CutLongLinesTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["BorderType", this.collections.loc.BorderType + ":", this.DropDownListForExportForm(null, 160, this.collections.loc.BorderTypeTooltip, this.GetBorderTypeItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["ZoomX", this.collections.loc.ZoomXY ? this.collections.loc.ZoomXY.replace(":", "") + " X: " : "", this.DropDownListForExportForm(null, 160, this.collections.loc.ZoomXYTooltip, this.GetZoomItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["ZoomY", this.collections.loc.ZoomXY ? this.collections.loc.ZoomXY.replace(":", "") + " Y: " : "", this.DropDownListForExportForm(null, 160, this.collections.loc.ZoomXYTooltip, this.GetZoomItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["EncodingTextOrCsvFile", this.collections.loc.EncodingData, this.DropDownListForExportForm(null, 160, this.collections.loc.EncodingDataTooltip, this.GetEncodingDataItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["ImageFormat", this.collections.loc.ImageFormat, this.DropDownListForExportForm(null, 160, this.collections.loc.ImageFormatTooltip, this.GetImageFormatItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["DitheringType", this.collections.loc.MonochromeDitheringType, this.DropDownListForExportForm(null, 160, this.collections.loc.MonochromeDitheringTypeTooltip, this.GetMonochromeDitheringTypeItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["TiffCompressionScheme", this.collections.loc.TiffCompressionScheme, this.DropDownListForExportForm(null, 160, this.collections.loc.TiffCompressionSchemeTooltip, this.GetTiffCompressionSchemeItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["CutEdges", null, this.CheckBox(null, this.collections.loc.CutEdges, this.collections.loc.CutEdgesTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["MultipleFiles", null, this.CheckBox(null, this.collections.loc.MultipleFiles, this.collections.loc.MultipleFilesTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["ExportDataOnly", null, this.CheckBox(null, this.collections.loc.ExportDataOnly, this.collections.loc.ExportDataOnlyTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["UseDefaultSystemEncoding", null, this.CheckBox(null, this.collections.loc.UseDefaultSystemEncoding, this.collections.loc.UseDefaultSystemEncodingTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["EncodingDifFile", this.collections.loc.EncodingDifFile, this.DropDownListForExportForm(null, 160, this.collections.loc.EncodingDifFileTooltip, this.GetEncodingDifFileItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["ExportModeRtf", this.collections.loc.ExportModeRtf, this.DropDownListForExportForm(null, 160, this.collections.loc.ExportModeRtfTooltip, this.GetExportModeRtfItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["UsePageHeadersAndFooters", null, this.CheckBox(null, this.collections.loc.UsePageHeadersFooters, this.collections.loc.UsePageHeadersFootersTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["RemoveEmptySpaceAtBottom", null, this.CheckBox(null, this.collections.loc.RemoveEmptySpace, this.collections.loc.RemoveEmptySpaceTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["Separator", this.collections.loc.Separator, this.TextBox(null, 160, this.collections.loc.SeparatorTooltip), "SettingsGroup.container", "2px " + e + " 2px " + e], ["DataExportMode", this.collections.loc.BandsFilter, this.DropDownListForExportForm(null, 160, this.collections.loc.BandsFilterTooltip, this.GetDataExportModeItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["SkipColumnHeaders", null, this.CheckBox(null, this.collections.loc.SkipColumnHeaders, this.collections.loc.SkipColumnHeadersTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["ExportObjectFormatting", null, this.CheckBox(null, this.collections.loc.ExportObjectFormatting, this.collections.loc.ExportObjectFormattingTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["UseOnePageHeaderAndFooter", null, this.CheckBox(null, this.collections.loc.UseOnePageHeaderFooter, this.collections.loc.UseOnePageHeaderFooterTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["ExportEachPageToSheet", null, this.CheckBox(null, this.collections.loc.ExportEachPageToSheet, this.collections.loc.ExportEachPageToSheetTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["ExportPageBreaks", null, this.CheckBox(null, this.collections.loc.ExportPageBreaks, this.collections.loc.ExportPageBreaksTooltip), "SettingsGroup.container", "4px " + e + " 4px " + e], ["EncodingDbfFile", this.collections.loc.EncodingDbfFile, this.DropDownListForExportForm(null, 160, this.collections.loc.EncodingDbfFileTooltip, this.GetEncodingDbfFileItems(), !0), "SettingsGroup.container", "2px " + e + " 2px " + e], ["DocumentSecurityButton", null, this.SmallButton(null, this.collections.loc.DocumentSecurityButton, null, null, "Down", "stiJsViewerFormButton"), "SettingsGroup.container", "2px " + e + " 2px " + e], ["DigitalSignatureButton", null, this.SmallButton(null, this.collections.loc.DigitalSignatureButton, null, null, "Down", "stiJsViewerFormButton"), "SettingsGroup.container", "2px " + e + " 2px " + e], ["OpenAfterExport", null, this.CheckBox(null, this.collections.loc.OpenAfterExport, this.collections.loc.OpenAfterExportTooltip), null, "4px " + e + " 4px " + e], ["DocumentSecurityMenu", null, this.BaseMenu(A.name + "DocumentSecurityMenu", null, "Down", "stiJsViewerDropdownPanel"), null, null], ["PasswordInputUser", this.collections.loc.UserPassword, this.TextBox(null, 160, this.collections.loc.UserPasswordTooltip), "DocumentSecurityMenu.innerContent", "8px " + e + " 2px " + e], ["PasswordInputOwner", this.collections.loc.OwnerPassword, this.TextBox(null, 160, this.collections.loc.OwnerPasswordTooltip), "DocumentSecurityMenu.innerContent", "2px " + e + " 2px " + e], ["PrintDocument", null, this.CheckBox(null, this.collections.loc.AllowPrintDocument, this.collections.loc.AllowPrintDocumentTooltip), "DocumentSecurityMenu.innerContent", "4px " + e + " 4px " + e], ["ModifyContents", null, this.CheckBox(null, this.collections.loc.AllowModifyContents, this.collections.loc.AllowModifyContentsTooltip), "DocumentSecurityMenu.innerContent", "4px " + e + " 4px " + e], ["CopyTextAndGraphics", null, this.CheckBox(null, this.collections.loc.AllowCopyTextAndGraphics, this.collections.loc.AllowCopyTextAndGraphicsTooltip), "DocumentSecurityMenu.innerContent", "4px " + e + " 4px " + e], ["AddOrModifyTextAnnotations", null, this.CheckBox(null, this.collections.loc.AllowAddOrModifyTextAnnotations, this.collections.loc.AllowAddOrModifyTextAnnotationsTooltip), "DocumentSecurityMenu.innerContent", "4px " + e + " 4px " + e], ["KeyLength", this.collections.loc.EncryptionKeyLength, this.DropDownListForExportForm(null, 160, this.collections.loc.EncryptionKeyLengthTooltip, this.GetEncryptionKeyLengthItems(), !0), "DocumentSecurityMenu.innerContent", "2px " + e + " 8px " + e], ["DigitalSignatureMenu", null, this.BaseMenu(A.name + "DigitalSignatureMenu", null, "Down", "stiJsViewerDropdownPanel"), null, null], ["UseDigitalSignature", null, this.CheckBox(null, this.collections.loc.UseDigitalSignature, this.collections.loc.UseDigitalSignatureTooltip), "DigitalSignatureMenu.innerContent", "8px " + e + " 4px " + e], ["GetCertificateFromCryptoUI", null, this.CheckBox(null, this.collections.loc.GetCertificateFromCryptoUI, this.collections.loc.GetCertificateFromCryptoUITooltip), "DigitalSignatureMenu.innerContent", "4px " + e + " 4px " + e], ["SubjectNameString", this.collections.loc.SubjectNameString, this.TextBox(null, 160, this.collections.loc.SubjectNameStringTooltip), "DigitalSignatureMenu.innerContent", "8px " + e + " 8px " + e]], o = 0; o < t.length; o++) {
        var i = t[o][0]
          , s = t[o][1]
          , n = t[o][2]
          , a = t[o][3];
        if (A.controls[i] = n,
        t[o][4] && (n.style.margin = t[o][4]),
        "stiJsViewerGroupPanel" == n.className && (n.container.style.paddingBottom = "6px"),
        "DocumentSecurityMenu" == i || "DigitalSignatureMenu" == i)
            continue;
        if (null != a) {
            var r = a.split(".")
              , l = A.controls[r[0]];
            if (r.length > 1)
                for (var c = 1; c < r.length; c++)
                    l && (l = l[r[c]]);
            l && A.addControlToParentControl(s, n, l, i);
            continue
        }
        A.addControlToParentControl(s, n, A.container, i)
    }
    A.controls.PageRangePages.lastCell.style.paddingLeft = "60px";
    try {
        A.controls.PasswordInputUser.setAttribute("type", "password"),
        A.controls.PasswordInputOwner.setAttribute("type", "password"),
        A.controls.SaveReportPassword.setAttribute("type", "password")
    } catch (A) {}
    A.controls.DocumentSecurityMenu.parentButton = A.controls.DocumentSecurityButton,
    A.controls.DigitalSignatureMenu.parentButton = A.controls.DigitalSignatureButton;
    for (var p = ["DocumentSecurityButton", "DigitalSignatureButton"], o = 0; o < p.length; o++) {
        var h = A.controls[p[o]];
        h.innerTable.style.width = "100%",
        h.style.minWidth = "220px",
        h.caption.style.textAlign = "center",
        h.caption.style.width = "100%",
        h.style.display = "inline-block"
    }
    A.controls.ImageType.action = function() {
        A.showControlsByExportFormat("Image" + this.key, !0)
    }
    ,
    A.controls.DataType.action = function() {
        A.showControlsByExportFormat(this.key, !0)
    }
    ,
    A.controls.ExcelType.action = function() {
        var e = "ExcelBinary" == this.key ? "Excel" : this.key;
        A.showControlsByExportFormat(e, !0)
    }
    ,
    A.controls.HtmlType.action = function() {
        A.showControlsByExportFormat(this.key, !0)
    }
    ;
    for (var g = ["SaveReportMdc", "SaveReportMdz", "SaveReportMdx"], o = 0; o < g.length; o++)
        A.controls[g[o]].controlName = g[o],
        A.controls[g[o]].onChecked = function() {
            this.isChecked && A.controls.SaveReportPassword.setEnabled("SaveReportMdx" == this.controlName)
        }
        ;
    A.controls.PdfACompliance.onChecked = function() {
        for (var e = ["StandardPdfFonts", "EmbeddedFonts", "UseUnicode"], t = 0; t < e.length; t++)
            A.controls[e[t]].setEnabled(!this.isChecked)
    }
    ;
    for (var g = ["EmbeddedFonts", "UseUnicode"], o = 0; o < g.length; o++)
        A.controls[g[o]].onChecked = function() {
            this.isChecked && A.controls.StandardPdfFonts.setChecked(!1)
        }
        ;
    A.controls.StandardPdfFonts.onChecked = function() {
        if (!this.isChecked)
            return;
        for (var e = ["EmbeddedFonts", "UseUnicode"], t = 0; t < e.length; t++)
            A.controls[e[t]].setChecked(!1)
    }
    ,
    A.controls.ImageCompressionMethod.onChange = function() {
        A.controls.ImageQuality.setEnabled("Jpeg" == this.key)
    }
    ,
    A.controls.ExportDataOnly.onChecked = function() {
        A.controls.ExportObjectFormatting.setEnabled(this.isChecked),
        A.controls.UseOnePageHeaderAndFooter.setEnabled(!this.isChecked)
    }
    ,
    A.controls.UseDefaultSystemEncoding.onChecked = function() {
        A.controls.EncodingDifFile.setEnabled(!this.isChecked)
    }
    ,
    A.controls.ImageType.onChange = function() {
        A.controls.TiffCompressionScheme.setEnabled("Tiff" == this.key);
        var e = A.jsObject.GetImageFormatItems("Emf" == this.key);
        A.controls.ImageFormat.menu.addItems(e)
    }
    ,
    A.controls.ImageFormat.onChange = function() {
        A.controls.DitheringType.setEnabled("Monochrome" == this.key)
    }
    ,
    A.controls.DocumentSecurityButton.action = function() {
        A.jsObject.controls.menus[A.name + "DocumentSecurityMenu"].changeVisibleState(!this.isSelected)
    }
    ,
    A.controls.DigitalSignatureButton.action = function() {
        A.jsObject.controls.menus[A.name + "DigitalSignatureMenu"].changeVisibleState(!this.isSelected)
    }
    ,
    A.controls.UseDigitalSignature.onChecked = function() {
        A.controls.GetCertificateFromCryptoUI.setEnabled(this.isChecked),
        A.controls.SubjectNameString.setEnabled(this.isChecked && !A.controls.GetCertificateFromCryptoUI.isChecked)
    }
    ,
    A.controls.GetCertificateFromCryptoUI.onChecked = function() {
        A.controls.SubjectNameString.setEnabled(!this.isChecked && A.controls.UseDigitalSignature.isChecked)
    }
    ,
    A.setControlsValue = function(e, t) {
        var o = e || A.jsObject.getDefaultExportSettings(A.exportFormat);
        if (!o)
            return;
        var i = A.getExportControlNames();
        for (var s in A.controls)
            null != A.controls[s].setEnabled && A.controls[s].setEnabled(!0);
        var n = A.jsObject.isContainted(i, "ImageType") && "ImageTiff" != A.exportFormat;
        A.controls[n ? "PageRangeCurrentPage" : "PageRangeAll"].setChecked(!0),
        A.controls.PageRangeAll.setEnabled(!n);
        for (var a in o)
            if (A.jsObject.isContainted(i, a)) {
                if ("ImageType" == a || "DataType" == a || "ExcelType" == a || "HtmlType" == a) {
                    if (t)
                        continue;
                    switch (a) {
                    case "ImageType":
                        A.jsObject.options.exports.showExportToImageBmp || "Bmp" != o[a] || (o[a] = "Gif"),
                        A.jsObject.options.exports.showExportToImageGif || "Gif" != o[a] || (o[a] = "Jpeg"),
                        A.jsObject.options.exports.showExportToImageJpeg || "Jpeg" != o[a] || (o[a] = "Pcx"),
                        A.jsObject.options.exports.showExportToImagePcx || "Pcx" != o[a] || (o[a] = "Png"),
                        A.jsObject.options.exports.showExportToImagePng || "Png" != o[a] || (o[a] = "Tiff"),
                        A.jsObject.options.exports.showExportToImageTiff || "Tiff" != o[a] || (o[a] = "Emf"),
                        A.jsObject.options.exports.showExportToImageMetafile || "Emf" != o[a] || (o[a] = "Svg"),
                        A.jsObject.options.exports.showExportToImageSvg || "Svg" != o[a] || (o[a] = "Svgz"),
                        A.jsObject.options.exports.showExportToImageSvgz || "Svgz" != o[a] || (o[a] = "Bmp");
                        break;
                    case "DataType":
                        A.jsObject.options.exports.showExportToCsv || "Csv" != o[a] || (o[a] = "Dbf"),
                        A.jsObject.options.exports.showExportToDbf || "Dbf" != o[a] || (o[a] = "Xml"),
                        A.jsObject.options.exports.showExportToXml || "Xml" != o[a] || (o[a] = "Dif"),
                        A.jsObject.options.exports.showExportToDif || "Dif" != o[a] || (o[a] = "Sylk"),
                        A.jsObject.options.exports.showExportToSylk || "Sylk" != o[a] || (o[a] = "Csv");
                        break;
                    case "ExcelType":
                        A.jsObject.options.exports.showExportToExcel2007 || "Excel2007" != o[a] || (o[a] = "ExcelBinary"),
                        A.jsObject.options.exports.showExportToExcel2007 || "Excel2007" != o[a] || (o[a] = "ExcelBinary"),
                        A.jsObject.options.exports.showExportToExcel || "ExcelBinary" != o[a] || (o[a] = "ExcelXml"),
                        A.jsObject.options.exports.showExportToExcelXml || "ExcelXml" != o[a] || (o[a] = "Excel2007");
                        break;
                    case "HtmlType":
                        A.jsObject.options.exports.showExportToHtml || "Html" != o[a] || (o[a] = "Html5"),
                        A.jsObject.options.exports.showExportToHtml5 || "Html5" != o[a] || (o[a] = "Mht"),
                        A.jsObject.options.exports.showExportToMht || "Mht" != o[a] || (o[a] = "Html")
                    }
                }
                var r = A.controls[a];
                A.setDefaultValueToControl(r, o[a])
            }
        if ("Document" == A.exportFormat && A.controls.SaveReportMdc.setChecked(!0),
        "Pdf" == A.exportFormat && o.StandardPdfFonts && A.controls.StandardPdfFonts.setChecked(!0),
        A.jsObject.isContainted(i, "HtmlType") && o.ImageFormat && A.controls.ImageFormatForHtml.setKey(o.ImageFormat),
        "Rtf" == A.exportFormat && o.ExportMode && A.controls.ExportModeRtf.setKey(o.ExportMode),
        A.jsObject.isContainted(i, "ImageType") && o.ImageZoom && A.controls.Zoom.setKey(o.ImageZoom.toString()),
        "Pdf" == A.exportFormat) {
            var l = o.UserAccessPrivileges;
            A.controls.PrintDocument.setChecked(l.indexOf("PrintDocument") != -1 || "All" == l),
            A.controls.ModifyContents.setChecked(l.indexOf("ModifyContents") != -1 || "All" == l),
            A.controls.CopyTextAndGraphics.setChecked(l.indexOf("CopyTextAndGraphics") != -1 || "All" == l),
            A.controls.AddOrModifyTextAnnotations.setChecked(l.indexOf("AddOrModifyTextAnnotations") != -1 || "All" == l)
        }
        "Difs" != A.exportFormat && "Sylk" != A.exportFormat || A.controls.EncodingDifFile.setKey("437"),
        "Dbf" == A.exportFormat && o.CodePage && A.controls.EncodingDbfFile.setKey(o.CodePage),
        "Text" != A.exportFormat && "Csv" != A.exportFormat || !o.Encoding || A.controls.EncodingTextOrCsvFile.setKey(o.Encoding)
    }
    ,
    A.onhide = function() {
        A.jsObject.SetCookie("StimulsoftWebViewerExportSettingsOpeningGroups", JSON.stringify({
            SavingReportGroup: A.controls.SavingReportGroup.isOpened,
            PageRangeGroup: A.controls.PageRangeGroup.isOpened,
            SettingsGroup: A.controls.SettingsGroup.isOpened
        }))
    }
    ,
    A.show = function(e, t) {
        if (A.actionType = t,
        A.showControlsByExportFormat(e || "Pdf"),
        A.jsObject.options.exports.storeExportSettings) {
            var o = A.jsObject.GetCookie("StimulsoftWebViewerExportSettings" + A.jsObject.GetCommonExportFormat(A.exportFormat));
            if (o) {
                var i = JSON.parse(o)
                  , e = i.ImageType || i.DataType || i.ExcelType || i.HtmlType;
                e && A.showControlsByExportFormat(i.ImageType ? "Image" + e : e),
                A.setControlsValue(i)
            }
        }
        var s = A.jsObject.GetCookie("StimulsoftWebViewerExportSettingsOpeningGroups")
          , n = s ? JSON.parse(s) : null;
        A.controls.SavingReportGroup.changeOpeningState(!n || n.SavingReportGroup),
        A.controls.PageRangeGroup.changeOpeningState(!n || n.PageRangeGroup),
        A.controls.SettingsGroup.changeOpeningState(!!n && n.SettingsGroup),
        A.changeVisibleState(!0)
    }
    ,
    A.action = function() {
        var e = A.getExportSettingsObject();
        A.changeVisibleState(!1),
        A.jsObject.options.exports.storeExportSettings && A.jsObject.SetCookie("StimulsoftWebViewerExportSettings" + A.jsObject.GetCommonExportFormat(A.exportFormat), JSON.stringify(e)),
        A.actionType == A.jsObject.options.actions.exportReport ? A.jsObject.postExport(A.exportFormat, e) : A.jsObject.options.email.showEmailDialog ? A.jsObject.controls.forms.sendEmailForm.show(A.exportFormat, e) : (e.Email = A.jsObject.options.email.defaultEmailAddress,
        e.Message = A.jsObject.options.email.defaultEmailMessage,
        e.Subject = A.jsObject.options.email.defaultEmailSubject,
        A.jsObject.postEmail(A.exportFormat, e))
    }
    ,
    A.showControlsByExportFormat = function(e, t) {
        A.exportFormat = e;
        for (var o in A.controls) {
            var i = A.controls[o]
              , s = A.getExportControlNames();
            i.parentRow && (i.parentRow.style.display = this.actionType != this.jsObject.options.actions.exportReport && "OpenAfterExport" == o || !A.jsObject.isContainted(s, o) ? "none" : "")
        }
        A.setControlsValue(null, t)
    }
    ,
    A.setDefaultValueToControl = function(A, e) {
        null != A.setKey ? A.setKey(e.toString()) : null != A.setChecked ? A.setChecked(e) : null != A.value && (A.value = e)
    }
    ,
    A.getValueFromControl = function(A) {
        if (0 == A.isEnabled)
            return null == A.setChecked && null;
        if (null != A.setKey)
            return A.key;
        if (null != A.setChecked)
            return A.isChecked;
        if (null != A.value)
            return A.value;
        return null
    }
    ,
    A.getExportControlNames = function() {
        var e = {
            Document: ["SavingReportGroup", "SaveReportMdc", "SaveReportMdz", "SaveReportMdx", "SaveReportPassword"],
            Pdf: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageCompressionMethod", "ImageQuality", "EmbeddedFonts", "ExportRtfTextAsImage", "PdfACompliance", "DocumentSecurityButton", "DigitalSignatureButton", "OpenAfterExport", "AllowEditable", "PasswordInputUser", "PasswordInputOwner", "PrintDocument", "ModifyContents", "CopyTextAndGraphics", "AddOrModifyTextAnnotations", "KeyLength", "UseDigitalSignature", "GetCertificateFromCryptoUI", "SubjectNameString"],
            Xps: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality", "OpenAfterExport", "ExportRtfTextAsImage"],
            Ppt2007: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality"],
            Html: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "HtmlType", "Zoom", "ImageFormatForHtml", "ExportMode", "UseEmbeddedImages", "AddPageBreaks", "OpenAfterExport"],
            Html5: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "HtmlType", "ImageFormatForHtml", "ImageResolution", "ImageQuality", "ContinuousPages", "OpenAfterExport"],
            Mht: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "HtmlType", "Zoom", "ImageFormatForHtml", "ExportMode", "AddPageBreaks"],
            Text: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "KillSpaceLines", "PutFeedPageCode", "DrawBorder", "CutLongLines", "BorderType", "ZoomX", "ZoomY", "EncodingTextOrCsvFile"],
            Rtf: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality", "ExportModeRtf", "UsePageHeadersAndFooters", "RemoveEmptySpaceAtBottom"],
            Word2007: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality", "UsePageHeadersAndFooters", "RemoveEmptySpaceAtBottom"],
            Odt: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality", "RemoveEmptySpaceAtBottom"],
            Excel: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ExcelType", "ImageResolution", "ImageQuality", "ExportDataOnly", "ExportObjectFormatting", "UseOnePageHeaderAndFooter", "ExportEachPageToSheet", "ExportPageBreaks"],
            ExcelXml: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ExcelType"],
            Excel2007: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ExcelType", "ImageResolution", "ImageQuality", "ExportDataOnly", "ExportObjectFormatting", "UseOnePageHeaderAndFooter", "ExportEachPageToSheet", "ExportPageBreaks"],
            Ods: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageResolution", "ImageQuality"],
            Csv: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "EncodingTextOrCsvFile", "Separator", "SkipColumnHeaders", "DataExportMode"],
            Dbf: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "EncodingDbfFile"],
            Dif: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "ExportDataOnly", "UseDefaultSystemEncoding", "EncodingDifFile"],
            Sylk: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType", "ExportDataOnly", "UseDefaultSystemEncoding", "EncodingDifFile"],
            Xml: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "DataType"],
            ImageBmp: ["PageRangeGroup", "PageRangeAll", "PageRangeCurrentPage", "PageRangePages", "PageRangePagesText", "SettingsGroup", "ImageType", "Zoom", "ImageResolution", "ImageFormat", "DitheringType", "TiffCompressionScheme", "CutEdges"]
        };
        return e.ImageGif = e.ImageJpeg = e.ImagePcx = e.ImageJpeg = e.ImagePng = e.ImageTiff = e.ImageEmf = e.ImageSvg = e.ImageSvgz = e.ImageBmp,
        e[A.exportFormat]
    }
    ,
    A.getExportSettingsObject = function() {
        for (var e = {}, t = A.getExportControlNames(), o = 0; o < t.length; o++) {
            var i = A.controls
              , s = t[o]
              , n = i[s];
            if (n.groupName == A.name + "SavingReportGroup" || n.groupName == A.name + "PageRangeGroup" || "PageRangePagesText" == s)
                continue;
            if ("SavingReportGroup" == s)
                e.Format = i.SaveReportMdc.isChecked ? "Mdc" : i.SaveReportMdz.isChecked ? "Mdz" : "Mdx",
                "Mdx" == e.Format && (e.Password = i.SaveReportPassword.value);
            else if ("PageRangeGroup" == s)
                e.PageRange = i.PageRangeAll.isChecked ? "All" : i.PageRangeCurrentPage.isChecked ? (A.jsObject.reportParams.pageNumber + 1).toString() : i.PageRangePagesText.value;
            else {
                var a = A.getValueFromControl(n);
                null != a && (e[s] = a)
            }
        }
        if ("Pdf" == A.exportFormat) {
            e.UserAccessPrivileges = "";
            for (var r = ["PrintDocument", "ModifyContents", "CopyTextAndGraphics", "AddOrModifyTextAnnotations"], o = 0; o < r.length; o++)
                e[r[o]] && ("" != e.UserAccessPrivileges && (e.UserAccessPrivileges += ", "),
                e.UserAccessPrivileges += r[o],
                delete e[r[o]])
        }
        A.jsObject.isContainted(t, "ImageType") && (e.ImageZoom = e.Zoom,
        delete e.Zoom);
        for (var r = [["ImageFormatForHtml", "ImageFormat"], ["EncodingTextOrCsvFile", "Encoding"], ["ExportModeRtf", "ExportMode"], ["EncodingDifFile", "Encoding"], ["EncodingDbfFile", "CodePage"]], o = 0; o < r.length; o++)
            null != e[r[o][0]] && (e[r[o][1]] = e[r[o][0]],
            delete e[r[o][0]]);
        return e
    }
}
,
StiJsViewer.prototype.GetCommonExportFormat = function(A) {
    if ("Html" == A || "Html5" == A || "Mht" == A)
        return "Html";
    if ("Excel" == A || "Excel2007" == A || "ExcelXml" == A)
        return "Excel";
    if ("Csv" == A || "Dbf" == A || "Xml" == A || "Dif" == A || "Sylk" == A)
        return "Data";
    if ("ImageBmp" == A || "ImageGif" == A || "ImageJpeg" == A || "ImagePcx" == A || "ImagePng" == A || "ImageTiff" == A || "ImageEmf" == A || "ImageSvg" == A || "ImageSvgz" == A)
        return "Image";
    return A
}
,
StiJsViewer.prototype.DropDownListForExportForm = function(A, e, t, o, i, s) {
    var n = this.DropDownList(A, e, t, o, i, s);
    return n.onChange = function() {}
    ,
    n.setKey = function(A) {
        n.key = A,
        n.onChange();
        for (var e in n.items)
            if (A == n.items[e].key)
                return this.textBox.value = n.items[e].caption,
                void (n.image && (n.image.style.background = "url(" + n.jsObject.collections.images[n.items[e].imageName] + ")"));
        n.textBox.value = A.toString()
    }
    ,
    n.menu && (n.menu.action = function(A) {
        this.changeVisibleState(!1),
        this.dropDownList.key = A.key,
        this.dropDownList.textBox.value = A.caption.innerHTML,
        this.dropDownList.image && (this.dropDownList.image.style.background = "url(" + this.jsObject.collections.images[A.imageName] + ")"),
        this.dropDownList.onChange(),
        this.dropDownList.action()
    }
    ),
    n
}
,
StiJsViewer.prototype.InitializeErrorMessageForm = function() {
    var A = this.BaseForm("errorMessageForm", this.collections.loc.Error, 4);
    A.buttonCancel.style.display = "none";
    var e = this.CreateHTMLTable();
    return A.container.appendChild(e),
    A.image = document.createElement("img"),
    A.image.style.padding = "15px",
    A.image.src = this.collections.images["MsgFormError.png"],
    e.addCellInLastRow(A.image),
    A.description = e.addCellInLastRow(),
    A.description.className = "stiJsViewerMessagesFormDescription",
    A.description.style.maxWidth = "600px",
    A.description.style.color = this.options.toolbar.fontColor,
    A.show = function(A, e) {
        if (this.visible)
            return void (this.description.innerHTML += "<br/>" + A);
        this.jsObject.controls.forms.errorMessageForm && (this.jsObject.controls.mainPanel.removeChild(this.jsObject.controls.forms.errorMessageForm),
        this.jsObject.controls.mainPanel.appendChild(this.jsObject.controls.forms.errorMessageForm)),
        this.image.src = e ? this.jsObject.collections.images["MsgFormInfo.png"] : this.jsObject.collections.images["MsgFormError.png"],
        this.caption.innerHTML = e ? this.jsObject.collections.loc.FormViewerTitle : this.jsObject.collections.loc.Error,
        this.changeVisibleState(!0),
        this.description.innerHTML = A
    }
    ,
    A.action = function() {
        this.changeVisibleState(!1)
    }
    ,
    A
}
,
StiJsViewer.prototype.InitializeSendEmailForm = function(A) {
    var e = this.BaseForm("sendEmailForm", this.collections.loc.EmailOptions, 1);
    e.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (e.style.color = this.options.toolbar.fontColor),
    e.style.fontSize = "12px",
    e.controls = {};
    var t = [["Email", this.collections.loc.Email, this.TextBox("sendEmailFormEmail", 280)], ["Subject", this.collections.loc.Subject, this.TextBox("sendEmailFormSubject", 280)], ["Message", this.collections.loc.Message, this.TextArea("sendEmailFormMessage", 280, 70)], ["AttachmentCell", this.collections.loc.Attachment, document.createElement("div")]]
      , o = this.CreateHTMLTable();
    e.container.appendChild(o);
    for (var i = 0; i < t.length; i++) {
        var s = t[i][2];
        s.style.margin = "4px",
        e.controls[t[i][0]] = s,
        o.addTextCellInLastRow(t[i][1]).className = "stiJsViewerCaptionControls",
        o.addCellInLastRow(s),
        i < t.length - 1 && o.addRow()
    }
    e.show = function(A, e) {
        this.changeVisibleState(!0),
        this.exportSettings = e,
        this.exportFormat = A;
        for (var t in this.controls)
            this.controls[t].value = "";
        this.controls.Email.value = this.jsObject.options.email.defaultEmailAddress,
        this.controls.Message.value = this.jsObject.options.email.defaultEmailMessage,
        this.controls.Subject.value = this.jsObject.options.email.defaultEmailSubject;
        var o = this.exportFormat.toLowerCase().replace("image", "");
        switch (o) {
        case "excel":
            o = "xls";
            break;
        case "excel2007":
            o = "xlsx";
            break;
        case "excelxml":
            o = "xls";
            break;
        case "html5":
            o = "html";
            break;
        case "jpeg":
            o = "jpg";
            break;
        case "ppt2007":
            o = "ppt";
            break;
        case "text":
            o = "txt";
            break;
        case "word2007":
            o = "docx"
        }
        this.controls.AttachmentCell.innerHTML = this.jsObject.reportParams.reportFileName + "." + o
    }
    ,
    e.action = function() {
        e.exportSettings.Email = e.controls.Email.value,
        e.exportSettings.Subject = e.controls.Subject.value,
        e.exportSettings.Message = e.controls.Message.value,
        e.changeVisibleState(!1),
        e.jsObject.postEmail(e.exportFormat, e.exportSettings)
    }
}
,
StiJsViewer.prototype.BaseMenu = function(A, e, t, o) {
    var i = document.createElement("div");
    i.className = "stiJsViewerParentMenu",
    i.jsObject = this,
    i.id = this.generateKey(),
    i.name = A,
    i.items = {},
    i.parentButton = e,
    i.type = null,
    e && (e.haveMenu = !0),
    i.animationDirection = t,
    i.rightToLeft = this.options.appearance.rightToLeft,
    i.visible = !1,
    i.style.display = "none",
    A && (this.controls.menus || (this.controls.menus = {}),
    null != this.controls.menus[A] && (this.controls.menus[A].changeVisibleState(!1),
    this.controls.mainPanel.removeChild(this.controls.menus[A])),
    this.controls.menus[A] = i),
    this.controls.mainPanel.appendChild(i);
    var s = document.createElement("div");
    return s.style.overflowY = "auto",
    s.style.overflowX = "hidden",
    s.style.maxHeight = "420px",
    s.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (s.style.color = this.options.toolbar.fontColor),
    i.appendChild(s),
    i.innerContent = s,
    s.className = o || "stiJsViewerMenu",
    i.changeVisibleState = function(A, e, t) {
        var o = "stiJsViewerMainPanel";
        if (e && (this.parentButton = e,
        e.haveMenu = !0),
        A) {
            this.onshow(),
            this.style.display = "",
            this.visible = !0,
            this.style.overflow = "hidden",
            this.parentButton.setSelected(!0),
            this.jsObject.options[null == this.type ? "currentMenu" : "current" + this.type] = this,
            this.style.width = this.innerContent.offsetWidth + "px",
            this.style.height = this.innerContent.offsetHeight + "px",
            this.style.left = this.rightToLeft || t ? this.jsObject.FindPosX(this.parentButton, o) - this.innerContent.offsetWidth + this.parentButton.offsetWidth + "px" : this.jsObject.FindPosX(this.parentButton, o) + "px",
            this.style.top = "Down" == this.animationDirection ? this.jsObject.FindPosY(this.parentButton, o) + this.parentButton.offsetHeight + 2 + "px" : this.jsObject.FindPosY(this.parentButton, o) - this.offsetHeight + "px",
            this.innerContent.style.top = ("Down" == this.animationDirection ? -1 : 1) * this.innerContent.offsetHeight + "px",
            d = new Date;
            var i = d.getTime();
            this.jsObject.options.toolbar.menuAnimation && (i += this.jsObject.options.menuAnimDuration),
            this.jsObject.ShowAnimationVerticalMenu(this, "Down" == this.animationDirection ? 0 : -1, i)
        } else
            this.onHide(),
            clearTimeout(this.innerContent.animationTimer),
            this.visible = !1,
            this.parentButton.setSelected(!1),
            this.style.display = "none",
            this.jsObject.options[null == this.type ? "currentMenu" : "current" + this.type] == this && (this.jsObject.options[null == this.type ? "currentMenu" : "current" + this.type] = null)
    }
    ,
    i.action = function(A) {
        return A
    }
    ,
    i.onmousedown = function() {
        this.isTouchStartFlag || this.ontouchstart(!0)
    }
    ,
    i.ontouchstart = function(A) {
        var e = this;
        this.isTouchStartFlag = !A,
        clearTimeout(this.isTouchStartTimer),
        this.jsObject.options.menuPressed = this,
        this.isTouchStartTimer = setTimeout(function() {
            e.isTouchStartFlag = !1
        }, 1e3)
    }
    ,
    i.onshow = function() {}
    ,
    i.onHide = function() {}
    ,
    i
}
,
StiJsViewer.prototype.InitializePrintMenu = function() {
    var A = [];
    A.push(this.Item("PrintPdf", this.collections.loc.PrintPdf, "PrintPdf.png", "PrintPdf")),
    A.push(this.Item("PrintWithPreview", this.collections.loc.PrintWithPreview, "PrintWithPreview.png", "PrintWithPreview")),
    A.push(this.Item("PrintWithoutPreview", this.collections.loc.PrintWithoutPreview, "PrintWithoutPreview.png", "PrintWithoutPreview"));
    var e = this.VerticalMenu("printMenu", this.controls.toolbar.controls.Print, "Down", A);
    e.action = function(A) {
        e.changeVisibleState(!1),
        e.jsObject.postPrint(A.key)
    }
}
,
StiJsViewer.prototype.InitializeSaveMenu = function(A, e) {
    var t = this.InitializeBaseSaveMenu("saveMenu", this.controls.toolbar.controls.Save);
    t.action = function(A) {
        t.changeVisibleState(!1),
        t.jsObject.options.exports.showExportDialog ? t.jsObject.controls.forms.exportForm.show(A.key, t.jsObject.options.actions.exportReport) : t.jsObject.postExport(A.key, t.jsObject.getDefaultExportSettings(A.key))
    }
}
,
StiJsViewer.prototype.InitializeBaseSaveMenu = function(A, e) {
    var t = !0
      , o = [];
    if (this.options.exports.showExportToDocument && "saveMenu" == A && (o.push(this.Item("Document", this.collections.loc.SaveDocument, "SaveDocument.png", "Document")),
    t = !1),
    ("saveMenu" == A && this.options.exports.showExportToPdf || this.options.exports.showExportToXps || this.options.exports.showExportToPowerPoint) && (t || o.push("separator1"),
    t = !1),
    this.options.exports.showExportToPdf && o.push(this.Item("Pdf", this.collections.loc.SavePdf, "SavePdf.png", "Pdf")),
    this.options.exports.showExportToXps && o.push(this.Item("Xps", this.collections.loc.SaveXps, "SaveXps.png", "Xps")),
    this.options.exports.showExportToPowerPoint && o.push(this.Item("Ppt2007", this.collections.loc.SavePpt2007, "SavePpt2007.png", "Ppt2007")),
    this.options.exports.showExportToHtml || this.options.exports.showExportToHtml5 || this.options.exports.showExportToMht) {
        t || o.push("separator2"),
        t = !1;
        var i = this.options.exports.defaultSettings.StiHtmlExportSettings.HtmlType;
        this.options.exports["showExportTo" + i] || (this.options.exports.showExportToHtml ? i = "Html" : this.options.exports.showExportToHtml5 ? i = "Html5" : this.options.exports.showExportToMht && (i = "Mht")),
        o.push(this.Item(i, this.collections.loc.SaveHtml, "SaveHtml.png", i))
    }
    if ((this.options.exports.showExportToText || this.options.exports.showExportToRtf || this.options.exports.showExportToWord2007 || this.options.exports.showExportToOdt) && (t || o.push("separator3"),
    t = !1),
    this.options.exports.showExportToText && o.push(this.Item("Text", this.collections.loc.SaveText, "SaveText.png", "Text")),
    this.options.exports.showExportToRtf && o.push(this.Item("Rtf", this.collections.loc.SaveRtf, "SaveRtf.png", "Rtf")),
    this.options.exports.showExportToWord2007 && o.push(this.Item("Word2007", this.collections.loc.SaveWord2007, "SaveWord2007.png", "Word2007")),
    this.options.exports.showExportToOpenDocumentWriter && o.push(this.Item("Odt", this.collections.loc.SaveOdt, "SaveOdt.png", "Odt")),
    (this.options.exports.showExportToExcel || this.options.exports.showExportToExcel2007 || this.options.exports.showExportToExcelXml || this.options.exports.showExportToOpenDocumentWriter) && (t || o.push("separator4"),
    t = !1),
    this.options.exports.showExportToExcel || this.options.exports.showExportToExcelXml || this.options.exports.showExportToExcel2007) {
        var s = this.options.exports.defaultSettings.StiExcelExportSettings.ExcelType;
        "ExcelBinary" == s && (s = "Excel"),
        this.options.exports["showExportTo" + s] || (this.options.exports.showExportToExcel ? s = "Excel" : this.options.exports.showExportToExcel2007 ? s = "Excel2007" : this.options.exports.showExportToExcelXml && (s = "ExcelXml")),
        o.push(this.Item(s, this.collections.loc.SaveExcel, "SaveExcel.png", s))
    }
    if (this.options.exports.showExportToOpenDocumentCalc && o.push(this.Item("Ods", this.collections.loc.SaveOds, "SaveOds.png", "Ods")),
    this.options.exports.showExportToCsv || this.options.exports.showExportToDbf || this.options.exports.showExportToXml || this.options.exports.showExportToDif || this.options.exports.showExportToSylk) {
        t || o.push("separator5"),
        t = !1;
        var n = this.options.exports.defaultSettings.StiDataExportSettings.DataType;
        this.options.exports["showExportTo" + n] || (this.options.exports.showExportToCsv ? n = "Csv" : this.options.exports.showExportToDbf ? n = "Dbf" : this.options.exports.showExportToXml ? n = "Xml" : this.options.exports.showExportToDif ? n = "Dif" : this.options.exports.showExportToSylk && (n = "Sylk")),
        o.push(this.Item(n, this.collections.loc.SaveData, "SaveData.png", n))
    }
    if (this.options.exports.showExportToImageBmp || this.options.exports.showExportToImageGif || this.options.exports.showExportToImageJpeg || this.options.exports.showExportToImagePcx || this.options.exports.showExportToImagePng || this.options.exports.showExportToImageTiff || this.options.exports.showExportToImageMetafile || this.options.exports.showExportToImageSvg || this.options.exports.showExportToImageSvgz) {
        t || o.push("separator6"),
        t = !1;
        var a = this.options.exports.defaultSettings.StiImageExportSettings.ImageType
          , r = "Emf" == a ? "Metafile" : a;
        this.options.exports["showExportToImage" + r] || (this.options.exports.showExportToImageBmp ? a = "Bmp" : this.options.exports.showExportToImageGif ? a = "Gif" : this.options.exports.showExportToImageJpeg ? a = "Jpeg" : this.options.exports.showExportToImagePcx ? a = "Pcx" : this.options.exports.showExportToImagePng ? a = "Png" : this.options.exports.showExportToImageTiff ? a = "Tiff" : this.options.exports.showExportToImageMetafile ? a = "Emf" : this.options.exports.showExportToImageSvg ? a = "Svg" : this.options.exports.showExportToImageSvgz && (a = "Svgz")),
        o.push(this.Item("Image" + a, this.collections.loc.SaveImage, "SaveImage.png", "Image" + a))
    }
    var l = this.VerticalMenu(A, e, "Down", o);
    return l.menuName = A,
    l
}
,
StiJsViewer.prototype.InitializeSendEmailMenu = function() {
    var A = this.InitializeBaseSaveMenu("sendEmailMenu", this.controls.toolbar.controls.SendEmail);
    A.action = function(A) {
        if (this.changeVisibleState(!1),
        this.jsObject.options.email.showExportDialog)
            this.jsObject.controls.forms.exportForm.show(A.key, this.jsObject.options.actions.emailReport);
        else if (this.jsObject.options.email.showEmailDialog)
            this.jsObject.controls.forms.sendEmailForm.show(A.key, this.jsObject.getDefaultExportSettings(A.key));
        else {
            var e = this.jsObject.getDefaultExportSettings(A.key);
            exportSettingsObject.Email = this.jsObject.options.email.defaultEmailAddress,
            exportSettingsObject.Message = this.jsObject.options.email.defaultEmailMessage,
            exportSettingsObject.Subject = this.jsObject.options.email.defaultEmailSubject,
            this.jsObject.postEmail(A.key, defaultSettings, this.jsObject.options.actions.emailReport)
        }
    }
}
,
StiJsViewer.prototype.VerticalMenu = function(A, e, t, o, i, s) {
    var n = this.BaseMenu(A, e, t, s);
    return n.itemStyleName = i,
    n.addItems = function(A) {
        while (this.innerContent.childNodes[0])
            this.innerContent.removeChild(this.innerContent.childNodes[0]);
        for (var e in A)
            "string" != typeof A[e] ? this.innerContent.appendChild(this.jsObject.VerticalMenuItem(this, A[e].name, A[e].caption, A[e].imageName, A[e].key, this.itemStyleName)) : this.innerContent.appendChild(this.jsObject.VerticalMenuSeparator(this, A[e]))
    }
    ,
    n.addItems(o),
    n
}
,
StiJsViewer.prototype.VerticalMenuItem = function(A, e, t, o, i, s) {
    var n = document.createElement("div");
    n.jsObject = this,
    n.menu = A,
    n.name = e,
    n.key = i,
    n.caption_ = t,
    n.imageName = o,
    n.styleName = s || "stiJsViewerMenuStandartItem",
    n.id = this.generateKey(),
    n.className = n.styleName,
    A.items[e] = n,
    n.isEnabled = !0,
    n.isSelected = !1,
    n.style.height = this.options.isTouchDevice ? "30px" : "24px";
    var a = this.CreateHTMLTable();
    if (n.appendChild(a),
    a.style.height = "100%",
    a.style.width = "100%",
    null != o) {
        n.cellImage = a.addCell(),
        n.cellImage.style.width = "22px",
        n.cellImage.style.minWidth = "22px",
        n.cellImage.style.padding = "0",
        n.cellImage.style.textAlign = "center";
        var r = document.createElement("img");
        n.image = r,
        n.cellImage.style.lineHeight = "0",
        n.cellImage.appendChild(r),
        r.src = this.collections.images[o]
    }
    if (null != t) {
        var l = a.addCell();
        n.caption = l,
        l.style.padding = "0 20px 0 7px",
        l.style.textAlign = "left",
        l.style.whiteSpace = "nowrap",
        l.innerHTML = t
    }
    return n.onmouseover = function() {
        if (this.isTouchProcessFlag || !this.isEnabled)
            return;
        this.className = this.styleName + " " + this.styleName + "Over"
    }
    ,
    n.onmouseout = function() {
        if (this.isTouchProcessFlag || !this.isEnabled)
            return;
        this.className = this.styleName,
        this.isSelected && (this.className += " " + this.styleName + "Selected")
    }
    ,
    n.onclick = function() {
        if (this.isTouchProcessFlag || !this.isEnabled)
            return;
        this.action()
    }
    ,
    n.ontouchstart = function() {
        this.jsObject.options.fingerIsMoved = !1
    }
    ,
    n.ontouchend = function() {
        if (!this.isEnabled || this.jsObject.options.fingerIsMoved)
            return;
        this.isTouchProcessFlag = !0,
        this.className = this.styleName + " " + this.styleName + "Over";
        var A = this;
        setTimeout(function() {
            A.className = A.styleName,
            A.action()
        }, 150),
        setTimeout(function() {
            A.isTouchProcessFlag = !1
        }, 1e3)
    }
    ,
    n.action = function() {
        this.menu.action(this)
    }
    ,
    n.setEnabled = function(A) {
        this.isEnabled = A,
        this.className = this.styleName + " " + (A ? "" : this.styleName + "Disabled")
    }
    ,
    n.setSelected = function(A) {
        if (!A)
            return this.isSelected = !1,
            void (this.className = this.styleName);
        null != this.menu.selectedItem && (this.menu.selectedItem.className = this.styleName,
        this.menu.selectedItem.isSelected = !1),
        this.className = this.styleName + " " + this.styleName + "Selected",
        this.menu.selectedItem = this,
        this.isSelected = !0
    }
    ,
    n
}
,
StiJsViewer.prototype.VerticalMenuSeparator = function(A, e) {
    var t = document.createElement("div");
    return t.className = "stiJsViewerVerticalMenuSeparator",
    A.items[e] = t,
    t
}
,
StiJsViewer.prototype.InitializeViewModeMenu = function() {
    var A = [];
    A.push(this.Item("OnePage", this.collections.loc.OnePage, "OnePage.png", "ViewModeOnePage")),
    A.push(this.Item("WholeReport", this.collections.loc.WholeReport, "WholeReport.png", "ViewModeWholeReport"));
    var e = this.VerticalMenu("viewModeMenu", this.controls.toolbar.controls.ViewMode, "Down", A);
    e.action = function(A) {
        e.changeVisibleState(!1),
        e.jsObject.postAction(A.key)
    }
}
,
StiJsViewer.prototype.InitializeZoomMenu = function() {
    for (var A = [], e = ["25", "50", "75", "100", "150", "200"], t = 0; t < e.length; t++)
        A.push(this.Item("Zoom" + e[t], e[t] + "%", "SelectedItem.png", "Zoom" + e[t]));
    A.push("separator1"),
    A.push(this.Item("ZoomOnePage", this.collections.loc.ZoomOnePage, "ZoomOnePage.png", "ZoomOnePage")),
    A.push(this.Item("ZoomPageWidth", this.collections.loc.ZoomPageWidth, "ZoomPageWidth.png", "ZoomPageWidth"));
    var o = this.VerticalMenu("zoomMenu", this.controls.toolbar.controls.Zoom, "Down", A);
    o.action = function(A) {
        o.changeVisibleState(!1),
        o.jsObject.postAction(A.key)
    }
}
;
var Base64 = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    encode: function(A) {
        var e = "", t, o, i, s, n, a, r, l = 0;
        A = Base64._utf8_encode(A);
        while (l < A.length)
            t = A.charCodeAt(l++),
            o = A.charCodeAt(l++),
            i = A.charCodeAt(l++),
            s = t >> 2,
            n = (3 & t) << 4 | o >> 4,
            a = (15 & o) << 2 | i >> 6,
            r = 63 & i,
            isNaN(o) ? a = r = 64 : isNaN(i) && (r = 64),
            e = e + this._keyStr.charAt(s) + this._keyStr.charAt(n) + this._keyStr.charAt(a) + this._keyStr.charAt(r);
        return e
    },
    decode: function(A) {
        var e = "", t, o, i, s, n, a, r, l = 0;
        A = A.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (l < A.length)
            s = this._keyStr.indexOf(A.charAt(l++)),
            n = this._keyStr.indexOf(A.charAt(l++)),
            a = this._keyStr.indexOf(A.charAt(l++)),
            r = this._keyStr.indexOf(A.charAt(l++)),
            t = s << 2 | n >> 4,
            o = (15 & n) << 4 | a >> 2,
            i = (3 & a) << 6 | r,
            e += String.fromCharCode(t),
            64 != a && (e += String.fromCharCode(o)),
            64 != r && (e += String.fromCharCode(i));
        return e = Base64._utf8_decode(e)
    },
    _utf8_encode: function(A) {
        A = A.replace(/\r\n/g, "\n");
        for (var e = "", t = 0; t < A.length; t++) {
            var o = A.charCodeAt(t);
            o < 128 ? e += String.fromCharCode(o) : o > 127 && o < 2048 ? (e += String.fromCharCode(o >> 6 | 192),
            e += String.fromCharCode(63 & o | 128)) : (e += String.fromCharCode(o >> 12 | 224),
            e += String.fromCharCode(o >> 6 & 63 | 128),
            e += String.fromCharCode(63 & o | 128))
        }
        return e
    },
    _utf8_decode: function(A) {
        var e = ""
          , t = 0
          , o = c1 = c2 = 0;
        while (t < A.length)
            o = A.charCodeAt(t),
            o < 128 ? (e += String.fromCharCode(o),
            t++) : o > 191 && o < 224 ? (c2 = A.charCodeAt(t + 1),
            e += String.fromCharCode((31 & o) << 6 | 63 & c2),
            t += 2) : (c2 = A.charCodeAt(t + 1),
            c3 = A.charCodeAt(t + 2),
            e += String.fromCharCode((15 & o) << 12 | (63 & c2) << 6 | 63 & c3),
            t += 3);
        return e
    }
}
  , JSON = JSON || {};
JSON.stringify = JSON.stringify || function(A) {
    var e = typeof A;
    if ("object" != e || null === A)
        return "string" == e && (A = '"' + A + '"'),
        String(A);
    var t, o, i = [], s = A && A.constructor == Array;
    for (t in A)
        o = A[t],
        e = typeof o,
        "string" == e ? o = '"' + o + '"' : "object" == e && null !== o && (o = JSON.stringify(o)),
        i.push((s ? "" : '"' + t + '":') + String(o));
    return (s ? "[" : "{") + String(i) + (s ? "]" : "}")
}
,
JSON.parse = JSON.parse || function(str) {
    return "" === str && (str = '""'),
    eval("var p=" + str + ";"),
    p
}
,
StiJsViewer.prototype.mergeOptions = function(A, e) {
    for (var t in A)
        void 0 === e[t] || "object" != typeof e[t] ? e[t] = A[t] : this.mergeOptions(A[t], e[t])
}
,
StiJsViewer.prototype.showError = function(A) {
    if (null != A && "string" == typeof A && "Error:" == A.substr(0, 6))
        return 7 == A.length && (A += "Undefined"),
        alert(A),
        !0;
    return !1
}
,
StiJsViewer.prototype.createXMLHttp = function() {
    if ("undefined" != typeof XMLHttpRequest)
        return new XMLHttpRequest;
    if (window.ActiveXObject)
        for (var A = ["MSXML2.XMLHttp.5.0", "MSXML2.XMLHttp.4.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp", "Microsoft.XMLHttp"], e = 0; e < A.length; e++)
            try {
                var t = new ActiveXObject(A[e]);
                return t
            } catch (A) {}
    throw new Error("Unable to create XMLHttp object.")
}
,
StiJsViewer.prototype.createPostParameters = function(A, e) {
    this.reportParams.zoom != -1 && this.reportParams.zoom != -2 || (this.reportParams.autoZoom = this.reportParams.zoom);
    var t = {
        viewerId: this.options.viewerId,
        routes: this.options.routes,
        formValues: this.options.formValues,
        clientGuid: this.options.clientGuid,
        reportGuid: this.reportParams.reportGuid,
        paramsGuid: this.reportParams.paramsGuid,
        drillDownGuid: this.reportParams.drillDownGuid,
        cacheMode: this.options.server.cacheMode,
        cacheTimeout: this.options.server.cacheTimeout,
        cacheItemPriority: this.options.server.cacheItemPriority,
        pageNumber: this.reportParams.pageNumber,
        zoom: this.reportParams.zoom == -1 || this.reportParams.zoom == -2 ? 100 : this.reportParams.zoom,
        viewMode: this.reportParams.viewMode,
        multiPageWidthCount: this.reportParams.multiPageWidthCount,
        multiPageHeightCount: this.reportParams.multiPageHeightCount,
        multiPageContainerWidth: this.reportParams.multiPageContainerWidth,
        multiPageContainerHeight: this.reportParams.multiPageContainerHeight,
        multiPageMargins: this.reportParams.multiPageMargins,
        showBookmarks: this.options.toolbar.showBookmarksButton,
        openLinksTarget: this.options.appearance.openLinksTarget,
        chartRenderType: this.options.appearance.chartRenderType,
        reportDisplayMode: this.options.appearance.reportDisplayMode,
        drillDownParameters: this.reportParams.drillDownParameters,
        editableParameters: this.reportParams.editableParameters
    };
    if (A)
        for (var o in A)
            t[o] = A[o];
    var i = null;
    return e ? (i = {},
    t.action && (i.jsviewer_action = t.action,
    delete t.action),
    i.jsviewer_parameters = Base64.encode(JSON.stringify(t))) : (i = "",
    t.action && (i += "jsviewer_action=" + t.action + "&",
    delete t.action),
    i += "jsviewer_parameters=" + encodeURIComponent(Base64.encode(JSON.stringify(t)))),
    i
}
,
StiJsViewer.prototype.postAjax = function(A, e, t) {
    this.controls.toolbar && e && "GetReport" == e.action && this.controls.toolbar.setEnabled(!1);
    var o = this
      , i = this.createXMLHttp();
    0 != o.options.server.requestTimeout && setTimeout(function() {
        i.readyState < 4 && i.abort()
    }, 1e3 * o.options.server.requestTimeout),
    i.open("POST", A, !0),
    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
    i.responseType = "text",
    e && e.responseType && (i.responseType = e.responseType),
    i.onreadystatechange = function() {
        if (4 == i.readyState) {
            var A = 0;
            try {
                A = i.status
            } catch (A) {}
            0 == A ? t("Error: Timeout response from the server", o) : 200 == A ? t(i.response ? i.response : i.responseText, o) : t("Error: " + A + " - " + i.statusText, o)
        }
    }
    ;
    var s = this.createPostParameters(e, !1);
    i.send(s)
}
,
StiJsViewer.prototype.postForm = function(A, e, t) {
    t || (t = document);
    var o = t.createElement("FORM");
    o.setAttribute("method", "POST"),
    o.setAttribute("action", A);
    var i = this.createPostParameters(e, !0);
    for (var s in i) {
        var n = t.createElement("INPUT");
        n.setAttribute("type", "hidden"),
        n.setAttribute("name", s),
        n.setAttribute("value", i[s]),
        o.appendChild(n)
    }
    t.body.appendChild(o),
    o.submit(),
    t.body.removeChild(o)
}
,
StiJsViewer.prototype.postAction = function(A, e, t) {
    switch (A) {
    case "Refresh":
        break;
    case "Print":
        switch (this.options.toolbar.printDestination) {
        case "Pdf":
            this.postPrint("PrintPdf");
            break;
        case "Direct":
            this.postPrint("PrintWithoutPreview");
            break;
        case "WithPreview":
            this.postPrint("PrintWithPreview");
            break;
        default:
            this.controls.menus.printMenu.changeVisibleState(!this.controls.menus.printMenu.visible)
        }
        return;
    case "Save":
        return void this.controls.menus.saveMenu.changeVisibleState(!this.controls.menus.saveMenu.visible);
    case "SendEmail":
        return void this.controls.menus.sendEmailMenu.changeVisibleState(!this.controls.menus.sendEmailMenu.visible);
    case "Zoom":
        return void this.controls.menus.zoomMenu.changeVisibleState(!this.controls.menus.zoomMenu.visible);
    case "ViewMode":
        return void this.controls.menus.viewModeMenu.changeVisibleState(!this.controls.menus.viewModeMenu.visible);
    case "FirstPage":
        this.reportParams.pageNumber = 0;
        break;
    case "PrevPage":
        this.reportParams.pageNumber > 0 && this.reportParams.pageNumber--;
        break;
    case "NextPage":
        this.reportParams.pageNumber < this.reportParams.pagesCount - 1 && this.reportParams.pageNumber++;
        break;
    case "LastPage":
        this.reportParams.pageNumber = this.reportParams.pagesCount - 1;
        break;
    case "FullScreen":
        return void this.changeFullScreenMode(!this.options.appearance.fullScreenMode);
    case "Zoom25":
        this.reportParams.zoom = 25;
        break;
    case "Zoom50":
        this.reportParams.zoom = 50;
        break;
    case "Zoom75":
        this.reportParams.zoom = 75;
        break;
    case "Zoom100":
        this.reportParams.zoom = 100;
        break;
    case "Zoom150":
        this.reportParams.zoom = 150;
        break;
    case "Zoom200":
        this.reportParams.zoom = 200;
        break;
    case "ZoomOnePage":
        this.reportParams.zoom = parseInt(this.controls.reportPanel.getZoomByPageHeight());
        break;
    case "ZoomPageWidth":
        this.reportParams.zoom = parseInt(this.controls.reportPanel.getZoomByPageWidth());
        break;
    case "ViewModeOnePage":
        this.reportParams.viewMode = "OnePage";
        break;
    case "ViewModeWholeReport":
        this.reportParams.viewMode = "WholeReport";
        break;
    case "ViewModeMultiPage":
        this.reportParams.viewMode = "MultiPage",
        this.reportParams.multiPageContainerWidth = this.controls.reportPanel.offsetWidth,
        this.reportParams.multiPageContainerHeight = this.controls.reportPanel.offsetHeight,
        this.reportParams.multiPageMargins = 10;
        break;
    case "GoToPage":
        this.reportParams.pageNumber = this.controls.toolbar.controls.PageControl.textBox.getCorrectValue() - 1;
        break;
    case "BookmarkAction":
        if (this.reportParams.pageNumber == e || "WholeReport" == this.reportParams.viewMode)
            return void this.scrollToAnchor(t);
        this.reportParams.pageNumber = e,
        this.options.bookmarkAnchor = t;
        break;
    case "Bookmarks":
        return void this.controls.bookmarksPanel.changeVisibleState(!this.controls.buttons.Bookmarks.isSelected);
    case "Parameters":
        return void this.controls.parametersPanel.changeVisibleState(!this.controls.buttons.Parameters.isSelected);
    case "Find":
        return void this.controls.findPanel.changeVisibleState(!this.controls.toolbar.controls.Find.isSelected);
    case "About":
        return void this.controls.aboutPanel.changeVisibleState(!this.controls.toolbar.controls.About.isSelected);
    case "Design":
        return void this.postDesign();
    case "Submit":
        return this.reportParams.editableParameters = null,
        this.reportParams.pageNumber = 0,
        void this.postInteraction({
            action: "Variables",
            variables: this.controls.parametersPanel.getParametersValues()
        });
    case "Reset":
        return this.options.parameters = {},
        this.controls.parametersPanel.clearParameters(),
        void this.controls.parametersPanel.addParameters();
    case "Editor":
        return void this.SetEditableMode(!this.options.editableMode)
    }
    this.controls.processImage.show(),
    this.postAjax(this.options.requestUrl.replace("{action}", null == A || "None" == this.options.server.cacheMode ? this.options.actions.getReportSnapshot : this.options.actions.viewerEvent), {
        action: null == A ? "GetReport" : "GetPages"
    }, this.showReportPage)
}
,
StiJsViewer.prototype.postPrint = function(A) {
    var e = {
        action: "PrintReport",
        printAction: A,
        bookmarksPrint: this.options.appearance.bookmarksPrint
    };
    switch (A) {
    case "PrintPdf":
        var t = this.options.requestAbsoluteUrl.replace("{action}", this.options.actions.printReport);
        window.navigator && window.navigator.msSaveOrOpenBlob || "MSIE" == this.getNavigatorName() ? this.printAsPdfIE(t, e) : this.printAsPdf(t, e);
        break;
    case "PrintWithPreview":
        this.printAsPopup(this.options.requestAbsoluteUrl.replace("{action}", this.options.actions.printReport), e);
        break;
    case "PrintWithoutPreview":
        this.postAjax(this.options.requestUrl.replace("{action}", this.options.actions.printReport), e, this.printAsHtml)
    }
}
,
StiJsViewer.prototype.printAsPdf = function(A, e) {
    e.responseType = "blob",
    this.postAjax(this.options.requestAbsoluteUrl.replace("{action}", this.options.actions.printReport), e, function(A, e) {
        var t = document.getElementById("pdfPrintFrame");
        null != t && document.body.removeChild(t),
        t = document.createElement("iframe"),
        t.id = "pdfPrintFrame",
        t.name = "pdfPrintFrame",
        t.width = "0",
        t.height = "0",
        t.style.position = "absolute",
        t.style.border = "none",
        document.body.appendChild(t, document.body.firstChild),
        t.src = URL.createObjectURL(A)
    })
}
,
StiJsViewer.prototype.printAsPdfIE = function(A, e) {
    var t = document.getElementById("pdfPrintFrame");
    null != t && document.body.removeChild(t),
    t = document.createElement("iframe"),
    t.id = "pdfPrintFrame",
    t.name = "pdfPrintFrame",
    t.width = "0",
    t.height = "0",
    t.style.position = "absolute",
    t.style.border = "none",
    document.body.appendChild(t, document.body.firstChild);
    var o = document.createElement("FORM");
    o.setAttribute("id", "printForm"),
    o.setAttribute("method", "POST"),
    o.setAttribute("action", A);
    var i = this.createPostParameters(e, !0);
    for (var s in i) {
        var n = document.createElement("INPUT");
        n.setAttribute("type", "hidden"),
        n.setAttribute("name", s),
        n.setAttribute("value", i[s]),
        o.appendChild(n)
    }
    var a = "<html><body>" + o.outerHTML + "<script>setTimeout(function () { document.getElementById('printForm').submit(); });</script></body></html>";
    t.contentWindow.document.open("application/pdf"),
    t.contentWindow.document.write(a),
    t.contentWindow.document.close()
}
,
StiJsViewer.prototype.printAsPopup = function(A, e) {
    var t = this.openNewWindow("about:blank", "PrintReport", "height=900, width=790, toolbar=no, menubar=yes, scrollbars=yes, resizable=yes, location=no, directories=no, status=no");
    null != t && this.postForm(A, e, t.document)
}
,
StiJsViewer.prototype.printAsHtml = function(A, e) {
    if (e.showError(A))
        return;
    printFrame = document.getElementById("htmlPrintFrame"),
    null == printFrame && (printFrame = document.createElement("iframe"),
    printFrame.id = "htmlPrintFrame",
    printFrame.name = "htmlPrintFrame",
    printFrame.width = "0px",
    printFrame.height = "0px",
    printFrame.style.position = "absolute",
    printFrame.style.border = "none",
    document.body.appendChild(printFrame, document.body.firstChild)),
    printFrame.contentWindow.document.open(),
    printFrame.contentWindow.document.write(A),
    printFrame.contentWindow.document.close(),
    setTimeout(function() {
        printFrame.contentWindow.focus(),
        printFrame.contentWindow.print()
    })
}
,
StiJsViewer.prototype.postExport = function(A, e, t) {
    var o = {
        action: "ExportReport",
        exportFormat: A,
        exportSettings: e
    }
      , i = e.OpenAfterExport && "_blank" == this.options.appearance.openExportedReportTarget ? this.openNewWindow("about:blank", "_blank").document : null
      , s = i ? this.options.requestAbsoluteUrl : this.options.requestUrl;
    this.postForm(s.replace("{action}", t), o, i)
}
,
StiJsViewer.prototype.postEmail = function(A, e) {
    var t = {
        action: "SendEmail",
        exportFormat: A,
        exportSettings: e
    };
    this.controls.processImage.show(),
    this.postAjax(this.options.requestUrl.replace("{action}", this.options.actions.emailReport), t, this.emailResult)
}
,
StiJsViewer.prototype.postDesign = function() {
    var A = "_blank" == this.options.appearance.designTarget ? this.openNewWindow("about:blank", "_blank").document : null
      , e = A ? this.options.requestAbsoluteUrl : this.options.requestUrl;
    this.postForm(e.replace("{action}", this.options.actions.designReport), {
        action: "DesignReport"
    }, A)
}
,
StiJsViewer.prototype.postInteraction = function(A) {
    if (!this.options.actions.interaction)
        return void (this.controls.buttons.Parameters && this.controls.buttons.Parameters.setEnabled(!1));
    if ("InitVars" != A.action && ("DrillDown" == A.action && (A.drillDownParameters = this.reportParams.drillDownParameters.concat(A.drillDownParameters),
    A.drillDownGuid = hex_md5(JSON.stringify(A.drillDownParameters))),
    this.options.server.globalReportCache && (A.variables || A.sortingParameters || A.collapsingParameters))) {
        var e = {};
        A.variables && (e.variables = A.variables),
        A.sortingParameters && (e.sortingParameters = A.sortingParameters),
        A.collapsingParameters && (e.collapsingParameters = A.collapsingParameters),
        A.paramsGuid = hex_md5(JSON.stringify(e))
    }
    this.controls.processImage.show(),
    this.postAjax(this.options.requestUrl.replace("{action}", this.options.actions.interaction), A, "InitVars" == A.action ? this.initializeParametersPanel : this.showReportPage)
}
,
StiJsViewer.prototype.initializeParametersPanel = function(A, e) {
    e.showError(A) && (A = null),
    e.options.isParametersReceived = !0;
    var t = "string" == typeof A ? JSON.parse(A) : A;
    e.options.paramsVariables = t,
    e.InitializeParametersPanel(),
    e.controls.processImage.hide()
}
,
StiJsViewer.prototype.parseParameters = function(A) {
    var e = "string" == typeof A && "{" == A.substr(0, 1) ? JSON.parse(A) : A
      , t = this.controls.drillDownPanel;
    if (0 == t.buttonsRow.children.length && t.addButton(e.reportFileName, this.reportParams),
    "DrillDown" == e.action) {
        t.changeVisibleState(!0);
        var o = !1;
        for (var i in t.buttons) {
            var s = t.buttons[i];
            if (s.reportParams.reportGuid == e.reportGuid && s.reportParams.drillDownGuid == e.drillDownGuid) {
                o = !0,
                s.style.display = "inline-block",
                s.select();
                break
            }
        }
        o || (this.controls.drillDownPanel.addButton(e.reportFileName),
        this.reportParams.drillDownParameters = e.drillDownParameters,
        this.reportParams.pageNumber = 0,
        this.reportParams.pagesWidth = 0,
        this.reportParams.pagesHeight = 0)
    }
    return this.reportParams.pagesArray = e.pagesArray,
    "GetPages" != e.action && (this.reportParams.reportGuid = e.reportGuid,
    this.reportParams.paramsGuid = e.paramsGuid,
    this.reportParams.drillDownGuid = e.drillDownGuid,
    this.reportParams.pagesCount = e.pagesCount,
    this.reportParams.zoom = e.zoom,
    this.reportParams.viewMode = e.viewMode,
    this.reportParams.reportFileName = e.reportFileName,
    this.reportParams.interactionCollapsingStates = e.interactionCollapsingStates,
    e.bookmarksContent && (this.reportParams.bookmarksContent = e.bookmarksContent),
    e.isEditableReport && this.controls.buttons.Editor && (this.controls.buttons.Editor.style.display = "")),
    e
}
,
StiJsViewer.prototype.emailResult = function(A, e) {
    e.controls.processImage.hide(),
    "0" == A ? alert(e.collections.loc.EmailSuccessfullySent) : 0 == A.indexOf("<?xml") ? (alert(e.GetXmlValue(A, "ErrorCode")),
    alert(e.GetXmlValue(A, "ErrorDescription"))) : alert(A)
}
,
StiJsViewer.prototype.showReportPage = function(A, e) {
    if ("null" == A && e.options.isReportRecieved)
        return e.options.isReportRecieved = !1,
        void e.postAction();
    if (e.controls.processImage.hide(),
    e.options.isReportRecieved = !0,
    e.showError(A))
        return;
    if ("null" == A)
        return;
    var t = e.parseParameters(A);
    if (null == t)
        return;
    t.bookmarksContent && e.InitializeBookmarksPanel(),
    t.pagesArray && e.controls.reportPanel.addPages(),
    e.controls.toolbar && (e.controls.toolbar.changeToolBarState(),
    e.controls.toolbar.setEnabled(!0)),
    null != e.reportParams.autoZoom && (e.postAction(e.reportParams.autoZoom == -1 ? "ZoomPageWidth" : "ZoomOnePage"),
    delete e.reportParams.autoZoom),
    null != e.options.bookmarkAnchor && (e.scrollToAnchor(e.options.bookmarkAnchor),
    e.options.bookmarkAnchor = null),
    e.options.findMode && e.controls.findPanel && e.showFindLabels(e.controls.findPanel.controls.findTextBox.value),
    !e.options.isParametersReceived && e.options.toolbar.showParametersButton && e.postInteraction({
        action: "InitVars"
    })
}
,
StiJsViewer.prototype.InitializeDoubleDatePicker = function(A) {
    this.controls.doubleDatePicker && this.controls.mainPanel.removeChild(this.controls.doubleDatePicker);
    var e = this.BaseMenu(null, A.secondParentButton, "Down", "stiJsViewerDropdownMenu");
    e.style.fontFamily = this.options.toolbar.fontFamily,
    "" != this.options.toolbar.fontColor && (e.style.color = this.options.toolbar.fontColor),
    e.style.zIndex = "36",
    e.dayButtons = [],
    e.showTime = !1,
    e.key = new Date,
    this.controls.doubleDatePicker = e,
    this.controls.mainPanel.appendChild(e);
    var t = this.CreateHTMLTable();
    t.style.margin = "4px",
    t.style.border = "1px dotted #c6c6c6",
    e.innerContent.appendChild(t);
    var o = this.InitializeDatePicker(e);
    o.ownerValue = A.firstOwnerValue,
    o.showTime = A.showTime,
    o.parentDataControl = A.firstParentDataControl,
    o.parentButton = A.firstParentButton;
    var i = this.InitializeDatePicker(e);
    i.ownerValue = A.secondOwnerValue,
    i.showTime = A.showTime,
    i.parentDataControl = A.secondParentDataControl,
    i.parentButton = A.secondParentButton,
    o.innerContent.className = "",
    i.innerContent.className = "",
    o.innerContent.style.margin = "4px",
    i.innerContent.style.margin = "4px",
    t.addCell(o.innerContent),
    t.addCell(i.innerContent).style.borderLeft = "1px dotted #c6c6c6";
    var s = document.createElement("div");
    t.addCell(s).style.borderLeft = "1px dotted #c6c6c6",
    s.jsObject = this,
    s.style.width = "150px",
    s.style.height = "250px",
    s.style.overflow = "auto",
    s.style.margin = "4px";
    for (var n = 0; n < this.collections.dateRanges.length; n++) {
        var a = this.collections.dateRanges[n]
          , r = this.SmallButton(null, this.collections.loc[a]);
        r.name = a,
        s.appendChild(r),
        r.action = function() {
            var t = e.jsObject.GetValuesByDateRangeName(this.name);
            t && (e.setValuesToDatePickers(t[0], t[1]),
            A.hideOnClick && e.changeVisibleState(!1))
        }
    }
    return e.onshow = function() {
        o.onshow(),
        i.onshow()
    }
    ,
    e.setValuesToDatePickers = function(A, e) {
        o.key = A,
        i.key = e,
        o.fill(),
        i.fill(),
        o.action(),
        i.action()
    }
    ,
    e
}
,
StiJsViewer.prototype.GetValuesByDateRangeName = function(A) {
    var e = new Date
      , t = this
      , o = function(A, e) {
        A.setHours(0),
        A.setMinutes(0),
        A.setSeconds(0),
        e.setHours(23),
        e.setMinutes(59),
        e.setSeconds(59)
    }
      , i = function(A) {
        var i = t.GetFirstDayOfWeek()
          , s = 0 == i ? e.getDay() : e.getDay() - 1;
        s < 0 && (s = 6);
        var n = [new Date(e.valueOf() - 864e5 * s)];
        return n.push(new Date(n[0].valueOf() + 6 * 864e5)),
        o(n[0], n[1]),
        n
    }
      , s = new Date
      , n = new Date;
    o(s, n);
    var a = [s, n];
    switch (A) {
    case "CurrentMonth":
        a[0].setDate(1),
        a[1].setDate(t.GetCountDaysOfMonth(e.getFullYear(), e.getMonth()));
        break;
    case "CurrentQuarter":
        var r = 3 * parseInt(e.getMonth() / 3);
        a[0].setMonth(r),
        a[1].setMonth(r + 2),
        a[0].setDate(1),
        a[1].setDate(t.GetCountDaysOfMonth(e.getFullYear(), r + 2));
        break;
    case "CurrentWeek":
        a = i(e);
        break;
    case "CurrentYear":
        a[0].setMonth(0),
        a[0].setDate(1),
        a[1].setMonth(11),
        a[1].setDate(31);
        break;
    case "NextMonth":
        var l = e.getMonth() + 1
          , c = e.getFullYear();
        l > 11 && (l = 0,
        c++),
        a[0].setYear(c),
        a[0].setMonth(l),
        a[0].setDate(1),
        a[1].setYear(c),
        a[1].setMonth(l),
        a[1].setDate(t.GetCountDaysOfMonth(c, l));
        break;
    case "NextQuarter":
        var c = e.getFullYear()
          , r = 3 * parseInt(e.getMonth() / 3) + 3;
        r > 11 && (r = 0,
        c++),
        a[0].setYear(c),
        a[1].setYear(c),
        a[0].setMonth(r),
        a[1].setMonth(r + 2),
        a[0].setDate(1),
        a[1].setDate(t.GetCountDaysOfMonth(c, r + 2));
        break;
    case "NextWeek":
        a = i(e),
        a[0] = new Date(a[0].valueOf() + 7 * 864e5),
        a[1] = new Date(a[1].valueOf() + 7 * 864e5);
        break;
    case "NextYear":
        a[0].setYear(e.getFullYear() + 1),
        a[1].setYear(e.getFullYear() + 1),
        a[0].setMonth(0),
        a[1].setMonth(11),
        a[0].setDate(1),
        a[1].setDate(31);
        break;
    case "PreviousMonth":
        var l = e.getMonth() - 1
          , c = e.getFullYear();
        l < 0 && (l = 11,
        c--),
        a[0].setYear(c),
        a[0].setMonth(l),
        a[0].setDate(1),
        a[1].setYear(c),
        a[1].setMonth(l),
        a[1].setDate(t.GetCountDaysOfMonth(c, l));
        break;
    case "PreviousQuarter":
        var c = e.getFullYear()
          , r = 3 * parseInt(e.getMonth() / 3) - 3;
        r < 0 && (r = 9,
        c--),
        a[0].setYear(c),
        a[1].setYear(c),
        a[0].setMonth(r),
        a[1].setMonth(r + 2),
        a[0].setDate(1),
        a[1].setDate(t.GetCountDaysOfMonth(c, r + 2));
        break;
    case "PreviousWeek":
        a = i(e),
        a[0] = new Date(a[0].valueOf() - 7 * 864e5),
        a[1] = new Date(a[1].valueOf() - 7 * 864e5);
        break;
    case "PreviousYear":
        a[0].setYear(e.getFullYear() - 1),
        a[1].setYear(e.getFullYear() - 1),
        a[0].setMonth(0),
        a[1].setMonth(11),
        a[0].setDate(1),
        a[1].setDate(31);
        break;
    case "FirstQuarter":
        a[0].setMonth(0),
        a[1].setMonth(2),
        a[0].setDate(1),
        a[1].setDate(t.GetCountDaysOfMonth(e.getFullYear(), 2));
        break;
    case "SecondQuarter":
        a[0].setMonth(3),
        a[1].setMonth(5),
        a[0].setDate(1),
        a[1].setDate(t.GetCountDaysOfMonth(e.getFullYear(), 5));
        break;
    case "ThirdQuarter":
        a[0].setMonth(6),
        a[1].setMonth(8),
        a[0].setDate(1),
        a[1].setDate(t.GetCountDaysOfMonth(e.getFullYear(), 8));
        break;
    case "FourthQuarter":
        a[0].setMonth(9),
        a[1].setMonth(11),
        a[0].setDate(1),
        a[1].setDate(t.GetCountDaysOfMonth(e.getFullYear(), 11));
        break;
    case "MonthToDate":
        a[0].setDate(1);
        break;
    case "QuarterToDate":
        var r = 3 * parseInt(e.getMonth() / 3);
        a[0].setMonth(r),
        a[0].setDate(1);
        break;
    case "WeekToDate":
        var p = i(e);
        a[0] = p[0];
        break;
    case "YearToDate":
        a[0].setMonth(0),
        a[0].setDate(1);
        break;
    case "Today":
        break;
    case "Tomorrow":
        a[0] = new Date(a[0].valueOf() + 864e5),
        a[1] = new Date(a[1].valueOf() + 864e5);
        break;
    case "Yesterday":
        a[0] = new Date(a[0].valueOf() - 864e5),
        a[1] = new Date(a[1].valueOf() - 864e5)
    }
    return a
}
;
;var Stimulsoft;
!function(e) {
    var t;
    !function(t) {
        var r = e.Base.Localization.StiLocalization
          , o = function() {
            function t() {}
            return t.GetLocalizationItems = function() {
                e.Base.Localization.StiLocalization.getJsonStringLocalization();
                var t = {};
                return t.EditorToolTip = r.get("FormViewer", "Editor"),
                t.TellMeMore = r.get("HelpDesigner", "TellMeMore"),
                t.Print = r.get("A_WebViewer", "PrintReport"),
                t.PrintToolTip = r.get("HelpViewer", "Print"),
                t.Save = r.get("A_WebViewer", "SaveReport"),
                t.SaveToolTip = r.get("HelpViewer", "Save"),
                t.SendEmail = r.get("FormViewer", "SendEMail").replaceAll("...", String.empty),
                t.SendEmailToolTip = r.get("HelpViewer", "SendEMail"),
                t.BookmarksToolTip = r.get("HelpViewer", "Bookmarks"),
                t.ParametersToolTip = r.get("HelpViewer", "Parameters"),
                t.FindToolTip = r.get("HelpViewer", "Find"),
                t.FirstPageToolTip = r.get("HelpViewer", "PageFirst"),
                t.PrevPageToolTip = r.get("HelpViewer", "PagePrevious"),
                t.NextPageToolTip = r.get("HelpViewer", "PageNext"),
                t.LastPageToolTip = r.get("HelpViewer", "PageLast"),
                t.FullScreenToolTip = r.get("HelpViewer", "FullScreen"),
                t.ZoomToolTip = r.get("FormViewer", "Zoom"),
                t.Loading = r.get("A_WebViewer", "Loading").replaceAll("...", ""),
                t.Bookmarks = r.get("FormViewer", "Bookmarks"),
                t.Parameters = r.get("FormViewer", "Parameters"),
                t.Time = r.get("FormFormatEditor", "Time"),
                t.Version = r.get("PropertyMain", "Version"),
                t.FindWhat = r.get("FormViewerFind", "FindWhat"),
                t.FindPrevious = r.get("FormViewerFind", "FindPrevious"),
                t.FindNext = r.get("FormViewerFind", "FindNext"),
                t.MatchCase = r.get("Editor", "MatchCase"),
                t.MatchWholeWord = r.get("Editor", "MatchWholeWord"),
                t.EmailOptions = r.get("A_WebViewer", "EmailOptions"),
                t.Email = r.get("A_WebViewer", "Email"),
                t.Subject = r.get("A_WebViewer", "Subject"),
                t.Message = r.get("A_WebViewer", "Message"),
                t.Attachment = r.get("A_WebViewer", "Attachment"),
                t.OnePage = r.get("A_WebViewer", "OnePage"),
                t.ViewModeToolTip = r.get("FormViewer", "ViewMode"),
                t.WholeReport = r.get("A_WebViewer", "WholeReport"),
                t.Design = r.get("Buttons", "Design"),
                t.Page = r.get("A_WebViewer", "Page"),
                t.PageOf = r.get("A_WebViewer", "PageOf"),
                t.SaveDocument = r.get("FormViewer", "DocumentFile"),
                t.SavePdf = r.get("Export", "ExportTypePdfFile"),
                t.SaveXps = r.get("Export", "ExportTypeXpsFile"),
                t.SavePpt2007 = r.get("Export", "ExportTypePpt2007File"),
                t.SaveHtml = r.get("Export", "ExportTypeHtmlFile"),
                t.SaveText = r.get("Export", "ExportTypeTxtFile"),
                t.SaveRtf = r.get("Export", "ExportTypeRtfFile"),
                t.SaveWord2007 = r.get("Export", "ExportTypeWord2007File"),
                t.SaveOdt = r.get("Export", "ExportTypeWriterFile"),
                t.SaveExcel = r.get("Export", "ExportTypeExcelFile"),
                t.SaveOds = r.get("Export", "ExportTypeCalcFile"),
                t.SaveData = r.get("Export", "ExportTypeDataFile"),
                t.SaveImage = r.get("Export", "ExportTypeImageFile"),
                t.PrintPdf = r.get("A_WebViewer", "PrintToPdf"),
                t.PrintWithPreview = r.get("A_WebViewer", "PrintWithPreview"),
                t.PrintWithoutPreview = r.get("A_WebViewer", "PrintWithoutPreview"),
                t.ZoomOnePage = r.get("Zoom", "PageHeight"),
                t.ZoomPageWidth = r.get("FormViewer", "ZoomPageWidth"),
                t.RemoveAll = r.get("Buttons", "RemoveAll"),
                t.NewItem = r.get("FormDictionaryDesigner", "NewItem"),
                t.Close = r.get("Buttons", "Close"),
                t.Reset = r.get("Gui", "cust_pm_reset"),
                t.Submit = r.get("Buttons", "Submit"),
                t.RangeFrom = r.get("PropertyMain", "RangeFrom"),
                t.RangeTo = r.get("PropertyMain", "RangeTo"),
                t.ExportFormTitle = r.get("Export", "title"),
                t.ButtonOk = r.get("Gui", "barname_ok"),
                t.ButtonCancel = r.get("Gui", "barname_cancel"),
                t.PagesRange = r.get("Report", "RangePage"),
                t.PagesRangeAll = r.get("Report", "RangeAll"),
                t.PagesRangeCurrentPage = r.get("Report", "RangeCurrentPage"),
                t.PagesRangePages = r.get("Report", "RangePages"),
                t.PagesRangeAllTooltip = r.get("HelpViewer", "PageAll"),
                t.PagesRangeCurrentPageTooltip = r.get("HelpViewer", "CurrentPage"),
                t.PagesRangePagesTooltip = r.get("HelpViewer", "RangePages"),
                t.SettingsGroup = r.get("Export", "Settings"),
                t.Type = r.get("PropertyMain", "Type") + ":",
                t.TypeTooltip = r.get("HelpViewer", "TypeExport"),
                t.ZoomHtml = r.get("Export", "Scale"),
                t.ZoomHtmlTooltip = r.get("HelpViewer", "ScaleHtml"),
                t.ImageFormatForHtml = r.get("Export", "ImageFormat"),
                t.ImageFormatForHtmlTooltip = r.get("HelpViewer", "ImageFormat"),
                t.SavingReport = r.get("DesignerFx", "SavingReport"),
                t.EmailSuccessfullySent = r.get("DesignerFx", "EmailSuccessfullySent"),
                t.SaveReportMdc = r.get("FormViewer", "DocumentFile").replaceAll("...", "") + " (.mdc)",
                t.SaveReportMdz = r.get("FormViewer", "CompressedDocumentFile") + " (.mdz)",
                t.SaveReportMdx = r.get("FormViewer", "EncryptedDocumentFile") + " (.mdx)",
                t.PasswordSaveReport = r.get("Report", "LabelPassword"),
                t.PasswordSaveReportTooltip = r.get("HelpViewer", "UserPassword"),
                t.ExportMode = r.get("Export", "ExportMode"),
                t.ExportModeTooltip = r.get("HelpViewer", "ExportMode"),
                t.CompressToArchive = r.get("Export", "CompressToArchive"),
                t.CompressToArchiveTooltip = r.get("HelpViewer", "CompressToArchive"),
                t.EmbeddedImageData = r.get("Export", "EmbeddedImageData"),
                t.EmbeddedImageDataTooltip = r.get("HelpViewer", "EmbeddedImageData"),
                t.AddPageBreaks = r.get("Export", "AddPageBreaks"),
                t.AddPageBreaksTooltip = r.get("HelpViewer", "AddPageBreaks"),
                t.ImageResolution = r.get("Export", "ImageResolution"),
                t.ImageResolutionTooltip = r.get("HelpViewer", "ImageResolution"),
                t.ImageCompressionMethod = r.get("Export", "ImageCompressionMethod"),
                t.ImageCompressionMethodTooltip = r.get("HelpViewer", "ImageCompressionMethod"),
                t.ImageQuality = r.get("Export", "ImageQuality"),
                t.ImageQualityTooltip = r.get("HelpViewer", "ImageQuality"),
                t.ContinuousPages = r.get("Export", "ContinuousPages"),
                t.ContinuousPagesTooltip = r.get("HelpViewer", "ContinuousPages"),
                t.StandardPDFFonts = r.get("Export", "StandardPDFFonts"),
                t.StandardPDFFontsTooltip = r.get("HelpViewer", "StandardPdfFonts"),
                t.EmbeddedFonts = r.get("Export", "EmbeddedFonts"),
                t.EmbeddedFontsTooltip = r.get("HelpViewer", "EmbeddedFonts"),
                t.UseUnicode = r.get("Export", "UseUnicode"),
                t.UseUnicodeTooltip = r.get("HelpViewer", "UseUnicode"),
                t.Compressed = r.get("Export", "Compressed"),
                t.CompressedTooltip = r.get("HelpViewer", "Compressed"),
                t.ExportRtfTextAsImage = r.get("Export", "ExportRtfTextAsImage"),
                t.ExportRtfTextAsImageTooltip = r.get("HelpViewer", "ExportRtfTextAsImage"),
                t.PdfACompliance = r.get("Export", "PdfACompliance"),
                t.PdfAComplianceTooltip = r.get("HelpViewer", "PdfACompliance"),
                t.KillSpaceLines = r.get("Export", "TxtKillSpaceLines"),
                t.KillSpaceLinesTooltip = r.get("HelpViewer", "KillSpaceLines"),
                t.PutFeedPageCode = r.get("Export", "TxtPutFeedPageCode"),
                t.PutFeedPageCodeTooltip = r.get("HelpViewer", "PutFeedPageCode"),
                t.DrawBorder = r.get("Export", "TxtDrawBorder"),
                t.DrawBorderTooltip = r.get("HelpViewer", "DrawBorder"),
                t.CutLongLines = r.get("Export", "TxtCutLongLines"),
                t.CutLongLinesTooltip = r.get("HelpViewer", "CutLongLines"),
                t.BorderType = r.get("Export", "TxtBorderType"),
                t.BorderTypeTooltip = r.get("HelpViewer", "BorderType"),
                t.BorderTypeSimple = r.get("Export", "TxtBorderTypeSimple"),
                t.BorderTypeSingle = r.get("Export", "TxtBorderTypeSingle"),
                t.BorderTypeDouble = r.get("Export", "TxtBorderTypeDouble"),
                t.ZoomXY = r.get("Export", "Zoom"),
                t.ZoomXYTooltip = r.get("HelpViewer", "ZoomTxt"),
                t.EncodingData = r.get("Export", "Encoding"),
                t.EncodingDataTooltip = r.get("HelpViewer", "EncodingData"),
                t.ImageFormat = r.get("Export", "ImageType"),
                t.ImageFormatTooltip = r.get("HelpViewer", "ImageType"),
                t.ImageFormatColor = r.get("PropertyMain", "Color"),
                t.ImageFormatGrayscale = r.get("Export", "ImageGrayscale"),
                t.ImageFormatMonochrome = r.get("Export", "ImageMonochrome"),
                t.MonochromeDitheringType = r.get("Export", "MonochromeDitheringType"),
                t.MonochromeDitheringTypeTooltip = r.get("HelpViewer", "DitheringType"),
                t.TiffCompressionScheme = r.get("Export", "TiffCompressionScheme"),
                t.TiffCompressionSchemeTooltip = r.get("HelpViewer", "TiffCompressionScheme"),
                t.CutEdges = r.get("Export", "ImageCutEdges"),
                t.CutEdgesTooltip = r.get("HelpViewer", "CutEdges"),
                t.MultipleFiles = r.get("Export", "MultipleFiles"),
                t.MultipleFilesTooltip = r.get("HelpViewer", "MultipleFiles"),
                t.ExportDataOnly = r.get("Export", "ExportDataOnly"),
                t.ExportDataOnlyTooltip = r.get("HelpViewer", "ExportDataOnly"),
                t.UseDefaultSystemEncoding = r.get("Export", "UseDefaultSystemEncoding"),
                t.UseDefaultSystemEncodingTooltip = r.get("HelpViewer", "UseDefaultSystemEncoding"),
                t.EncodingDifFile = r.get("Export", "Encoding"),
                t.EncodingDifFileTooltip = r.get("HelpViewer", "EncodingData"),
                t.ExportModeRtf = r.get("Export", "ExportMode"),
                t.ExportModeRtfTooltip = r.get("HelpViewer", "ExportModeRtf"),
                t.ExportModeRtfTable = r.get("Export", "ExportModeTable"),
                t.ExportModeRtfFrame = r.get("Export", "ExportModeFrame"),
                t.UsePageHeadersFooters = r.get("Export", "UsePageHeadersAndFooters"),
                t.UsePageHeadersFootersTooltip = r.get("HelpViewer", "UsePageHeadersAndFooters"),
                t.RemoveEmptySpace = r.get("Export", "RemoveEmptySpaceAtBottom"),
                t.RemoveEmptySpaceTooltip = r.get("HelpViewer", "RemoveEmptySpaceAtBottom"),
                t.Separator = r.get("Export", "Separator"),
                t.SeparatorTooltip = r.get("HelpViewer", "Separator"),
                t.SkipColumnHeaders = r.get("Export", "SkipColumnHeaders"),
                t.SkipColumnHeadersTooltip = r.get("HelpViewer", "SkipColumnHeaders"),
                t.ExportObjectFormatting = r.get("Export", "ExportObjectFormatting"),
                t.ExportObjectFormattingTooltip = r.get("HelpViewer", "ExportObjectFormatting"),
                t.UseOnePageHeaderFooter = r.get("Export", "UseOnePageHeaderAndFooter"),
                t.UseOnePageHeaderFooterTooltip = r.get("HelpViewer", "UseOnePageHeaderAndFooter"),
                t.ExportEachPageToSheet = r.get("Export", "ExportEachPageToSheet"),
                t.ExportEachPageToSheetTooltip = r.get("HelpViewer", "ExportEachPageToSheet"),
                t.ExportPageBreaks = r.get("Export", "ExportPageBreaks"),
                t.ExportPageBreaksTooltip = r.get("HelpViewer", "ExportPageBreaks"),
                t.EncodingDbfFile = r.get("Export", "Encoding"),
                t.EncodingDbfFileTooltip = r.get("HelpViewer", "EncodingData"),
                t.DocumentSecurityButton = r.get("Export", "DocumentSecurity"),
                t.DigitalSignatureButton = r.get("Export", "DigitalSignature"),
                t.OpenAfterExport = r.get("Export", "OpenAfterExport"),
                t.OpenAfterExportTooltip = r.get("HelpViewer", "OpenAfterExport"),
                t.AllowEditable = r.get("Export", "AllowEditable"),
                t.AllowEditableTooltip = r.get("HelpViewer", "AllowEditable"),
                t.NameYes = r.get("FormFormatEditor", "nameYes"),
                t.NameNo = r.get("FormFormatEditor", "nameNo"),
                t.UserPassword = r.get("Export", "labelUserPassword"),
                t.UserPasswordTooltip = r.get("HelpViewer", "UserPassword"),
                t.OwnerPassword = r.get("Export", "labelOwnerPassword"),
                t.OwnerPasswordTooltip = r.get("HelpViewer", "OwnerPassword"),
                t.BandsFilter = r.get("Export", "BandsFilter"),
                t.BandsFilterTooltip = r.get("HelpViewer", "ExportMode"),
                t.BandsFilterAllBands = r.get("Export", "AllBands"),
                t.BandsFilterDataOnly = r.get("Export", "DataOnly"),
                t.BandsFilterDataAndHeadersFooters = r.get("Export", "DataAndHeadersFooters"),
                t.AllowPrintDocument = r.get("Export", "AllowPrintDocument"),
                t.AllowPrintDocumentTooltip = r.get("HelpViewer", "AllowPrintDocument"),
                t.AllowModifyContents = r.get("Export", "AllowModifyContents"),
                t.AllowModifyContentsTooltip = r.get("HelpViewer", "AllowModifyContents"),
                t.AllowCopyTextAndGraphics = r.get("Export", "AllowCopyTextAndGraphics"),
                t.AllowCopyTextAndGraphicsTooltip = r.get("HelpViewer", "AllowCopyTextAndGraphics"),
                t.AllowAddOrModifyTextAnnotations = r.get("Export", "AllowAddOrModifyTextAnnotations"),
                t.AllowAddOrModifyTextAnnotationsTooltip = r.get("HelpViewer", "AllowAddOrModifyTextAnnotations"),
                t.EncryptionKeyLength = r.get("Export", "labelEncryptionKeyLength"),
                t.EncryptionKeyLengthTooltip = r.get("HelpViewer", "EncryptionKeyLength"),
                t.UseDigitalSignature = r.get("Export", "UseDigitalSignature"),
                t.UseDigitalSignatureTooltip = r.get("HelpViewer", "DigitalSignature"),
                t.GetCertificateFromCryptoUI = r.get("Export", "GetCertificateFromCryptoUI"),
                t.GetCertificateFromCryptoUITooltip = r.get("HelpViewer", "GetCertificateFromCryptoUI"),
                t.SubjectNameString = r.get("Export", "labelSubjectNameString"),
                t.SubjectNameStringTooltip = r.get("HelpViewer", "SubjectNameString"),
                t.MonthJanuary = r.get("A_WebViewer", "MonthJanuary"),
                t.MonthFebruary = r.get("A_WebViewer", "MonthFebruary"),
                t.MonthMarch = r.get("A_WebViewer", "MonthMarch"),
                t.MonthApril = r.get("A_WebViewer", "MonthApril"),
                t.MonthMay = r.get("A_WebViewer", "MonthMay"),
                t.MonthJune = r.get("A_WebViewer", "MonthJune"),
                t.MonthJuly = r.get("A_WebViewer", "MonthJuly"),
                t.MonthAugust = r.get("A_WebViewer", "MonthAugust"),
                t.MonthSeptember = r.get("A_WebViewer", "MonthSeptember"),
                t.MonthOctober = r.get("A_WebViewer", "MonthOctober"),
                t.MonthNovember = r.get("A_WebViewer", "MonthNovember"),
                t.MonthDecember = r.get("A_WebViewer", "MonthDecember"),
                t.DayMonday = r.get("A_WebViewer", "DayMonday"),
                t.DayTuesday = r.get("A_WebViewer", "DayTuesday"),
                t.DayWednesday = r.get("A_WebViewer", "DayWednesday"),
                t.DayThursday = r.get("A_WebViewer", "DayThursday"),
                t.DayFriday = r.get("A_WebViewer", "DayFriday"),
                t.DaySaturday = r.get("A_WebViewer", "DaySaturday"),
                t.DaySunday = r.get("A_WebViewer", "DaySunday"),
                t.FormViewerTitle = r.get("FormViewer", "title"),
                t.Error = r.get("Errors", "Error"),
                t.SelectAll = r.get("MainMenu", "menuEditSelectAll").replaceAll("&", ""),
                t.CurrentMonth = r.get("DatePickerRanges", "CurrentMonth"),
                t.CurrentQuarter = r.get("DatePickerRanges", "CurrentQuarter"),
                t.CurrentWeek = r.get("DatePickerRanges", "CurrentWeek"),
                t.CurrentYear = r.get("DatePickerRanges", "CurrentYear"),
                t.NextMonth = r.get("DatePickerRanges", "NextMonth"),
                t.NextQuarter = r.get("DatePickerRanges", "NextQuarter"),
                t.NextWeek = r.get("DatePickerRanges", "NextWeek"),
                t.NextYear = r.get("DatePickerRanges", "NextYear"),
                t.PreviousMonth = r.get("DatePickerRanges", "PreviousMonth"),
                t.PreviousQuarter = r.get("DatePickerRanges", "PreviousQuarter"),
                t.PreviousWeek = r.get("DatePickerRanges", "PreviousWeek"),
                t.PreviousYear = r.get("DatePickerRanges", "PreviousYear"),
                t.FirstQuarter = r.get("DatePickerRanges", "FirstQuarter"),
                t.SecondQuarter = r.get("DatePickerRanges", "SecondQuarter"),
                t.ThirdQuarter = r.get("DatePickerRanges", "ThirdQuarter"),
                t.FourthQuarter = r.get("DatePickerRanges", "FourthQuarter"),
                t.MonthToDate = r.get("DatePickerRanges", "MonthToDate"),
                t.QuarterToDate = r.get("DatePickerRanges", "QuarterToDate"),
                t.WeekToDate = r.get("DatePickerRanges", "WeekToDate"),
                t.YearToDate = r.get("DatePickerRanges", "YearToDate"),
                t.Today = r.get("DatePickerRanges", "Today"),
                t.Tomorrow = r.get("DatePickerRanges", "Tomorrow"),
                t.Yesterday = r.get("DatePickerRanges", "Yesterday"),
                t
            }
            ,
            t
        }();
        t.StiCollectionsHelper = o
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(t) {
        var r = e.Report.Components.StiText
          , o = e.Report.Components.StiCheckBox
          , i = e.Report.Components.StiRichText
          , n = e.System.Collections.Hashtable
          , a = function() {
            function t() {}
            return t.checkEditableReport = function(e) {
                for (var t = e.getComponents(), n = 0, a = t.list; n < a.length; n++) {
                    var s = a[n];
                    if (s.is(r) && s.editable)
                        return !0;
                    if (s.is(o) && s.editable)
                        return !0;
                    if (s.is(i) && s.editable)
                        return !0
                }
                return !1
            }
            ,
            t.applyEditableFieldsToReport = function(t, i) {
                if (null == i)
                    return;
                try {
                    for (var a = i.as(n), s = 0, l = a.keys; s < l.length; s++)
                        for (var p = l[s], g = p.toNumber(), m = a.get(p), u = 0, d = m.keys; u < d.length; u++) {
                            var c = d[u]
                              , S = c.toNumber()
                              , y = m.get(c);
                            if (g < t.renderedPages.count) {
                                var f = t.renderedPages.getByIndex(g);
                                if (S < f.components.count) {
                                    var h = f.components.getByIndex(S);
                                    "CheckBox" == y.get("type").toString() && h.is(o) ? h.checkedValue = y.get("checked").toBoolean() ? "true" : "false" : "Text" == y.get("type").toString() && h.is(r) && (h.text = y.get("text").toString())
                                }
                            }
                        }
                } catch (t) {
                    e.System.StiError.showError(t)
                }
            }
            ,
            t
        }();
        t.StiEditableFieldsHelper = a
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(t) {
        var r = e.Report.Export.StiDataExportMode
          , o = e.Report.StiExportFormat
          , i = e.Report.Export.StiHtmlExportMode
          , n = e.Report.Export.StiHtmlType
          , a = e.Report.ImageFormat
          , s = e.Report.StiRangeType
          , l = e.Report.Export.StiPdfAllowEditable
          , p = e.Report.Export.StiPdfImageCompressionMethod
          , g = e.Report.Export.StiPdfEncryptionKeyLength
          , m = e.Report.Export.StiUserAccessPrivileges
          , u = e.Report.Export.StiExcelType
          , d = function() {
            function e() {}
            return e.getReportFileName = function(e) {
                var t = null == e.reportAlias || 0 == e.reportAlias.trim().length ? e.reportName : e.reportAlias;
                return t.replaceAll('"', "")
            }
            ,
            e.applyExportSettings = function(e, t, d) {
                switch ("All" == t.PageRange ? d.pageRange.rangeType = s.All : (d.pageRange.rangeType = s.Pages,
                d.pageRange.pageRanges = t.PageRange),
                e) {
                case o.Html:
                    d.htmlType = n[t.HtmlType],
                    d.addPageBreaks = t.AddPageBreaks,
                    d.exportMode = i[t.ExportMode],
                    d.imageFormat = a[t.ImageFormat],
                    d.useEmbeddedImages = t.UseEmbeddedImages,
                    d.zoom = parseFloat(t.Zoom);
                    break;
                case o.Html5:
                    d.htmlType = n[t.HtmlType],
                    d.continuousPages = t.ContinuousPages,
                    d.imageFormat = a[t.ImageFormat],
                    d.imageQuality = parseFloat(t.ImageQuality),
                    d.imageResolution = parseFloat(t.ImageResolution);
                    break;
                case o.Pdf:
                    d.allowEditable = l[t.AllowEditable],
                    d.compressed = !1,
                    d.embeddedFonts = t.EmbeddedFonts,
                    d.exportRtfTextAsImage = t.ExportRtfTextAsImage,
                    d.getCertificateFromCryptoUI = t.GetCertificateFromCryptoUI,
                    d.imageCompressionMethod = p[t.ImageCompressionMethod],
                    d.imageQuality = parseFloat(t.ImageQuality),
                    d.imageResolution = parseFloat(t.ImageResolution),
                    d.keyLength = g[t.KeyLength],
                    d.passwordInputOwner = t.PasswordInputOwner,
                    d.passwordInputUser = t.PasswordInputUser,
                    d.pdfACompliance = t.PdfACompliance,
                    d.standardPdfFonts = t.StandardPdfFonts,
                    d.useDigitalSignature = t.UseDigitalSignature,
                    d.useUnicode = !1,
                    d.userAccessPrivileges = 0;
                    for (var c = t.UserAccessPrivileges.replaceAll(" ", "").split(","), S = 0; S < c.length; S++)
                        d.userAccessPrivileges += m[c[S]];
                    break;
                case o.Excel2007:
                    d.excelType = u[t.ExcelType],
                    d.exportDataOnly = t.ExportDataOnly,
                    d.exportEachPageToSheet = t.ExportEachPageToSheet,
                    d.exportObjectFormatting = t.ExportObjectFormatting,
                    d.exportPageBreaks = t.ExportPageBreaks,
                    d.imageQuality = parseFloat(t.ImageQuality),
                    d.imageResolution = parseFloat(t.ImageResolution),
                    d.useOnePageHeaderAndFooter = t.UseOnePageHeaderAndFooter;
                    break;
                case o.Word2007:
                    d.imageQuality = parseFloat(t.ImageQuality),
                    d.imageResolution = parseFloat(t.ImageResolution),
                    d.removeEmptySpaceAtBottom = t.RemoveEmptySpaceAtBottom,
                    d.usePageHeadersAndFooters = t.UsePageHeadersAndFooters;
                    break;
                case o.Csv:
                    d.separator = t.Separator,
                    d.skipColumnHeaders = t.SkipColumnHeaders,
                    d.dataExportMode = r[t.DataExportMode]
                }
            }
            ,
            e
        }();
        t.StiExportsHelper = d
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(t) {
        var r = e.Report.Components.StiChart
          , o = e.Report.Components.StiCrossHeaderInteraction
          , i = e.Report.StiReport
          , n = e.Report.Components.StiDataBand
          , a = e.Report.Components.StiInteractionSortDirection
          , s = e.Report.Components.StiSortHelper
          , l = function() {
            function e() {}
            return e.applySorting = function(e, t) {
                var r = t.ComponentName.toString().split(";")
                  , o = e.getComponentByName(r[0])
                  , i = r[1].toBoolean();
                r = t.DataBand.toString().split(";");
                var l = e.getComponentByName(r[0]).as(n);
                if (null != l && (l.sort = r.where(function(e, t) {
                    return 0 != t
                }).toArray()),
                null != o && null != l) {
                    var p = o.interaction.getSortColumnsString();
                    if (null == l.sort || 0 == l.sort.length)
                        l.sort = s.addColumnToSorting(l.sort, p, !0);
                    else {
                        var g = s.getColumnIndexInSorting(l.sort, p);
                        if (i)
                            g == -1 ? l.sort = s.addColumnToSorting(l.sort, p, !0) : l.sort = s.changeColumnSortDirection(l.sort, p);
                        else if (g != -1) {
                            var m = s.getColumnSortDirection(l.sort, p);
                            m = m == a.Ascending ? a.Descending : a.Ascending,
                            l.sort = s.addColumnToSorting([], p, m == a.Ascending),
                            o.interaction.sortingDirection = m
                        } else
                            l.sort = s.addColumnToSorting([], p, !0),
                            o.interaction.sortingDirection = a.Ascending
                    }
                    e.isRendered = !1
                }
            }
            ,
            e.applyCollapsing = function(e, t) {
                var r = t.ComponentName.toString()
                  , i = e.getComponentByName(r)
                  , n = i;
                if (null != n && null != n.interaction) {
                    e.interactionCollapsingStates = t.InteractionCollapsingStates;
                    var a = n.interaction.as(o);
                    null != a && a.collapsingEnabled,
                    e.isRendered = !1
                }
            }
            ,
            e.cloneReport = function(e) {
                var t = e.saveToJsonString()
                  , r = new i;
                if (r.load(t),
                null != e.variables && e.variables.count > 0)
                    for (var o = 0; o < e.variables.count; o++)
                        r.setVariable(e.variables.keys[o], e.variables.values[o]);
                return r.regData("", "", e.dataStore),
                r.regBusinessObject(e.businessObjectsStore),
                r.onBeginProcessData = e.onBeginProcessData,
                r.onEndProcessData = e.onEndProcessData,
                r
            }
            ,
            e.applyDrillDown = function(e, t, o) {
                var n = o.PageIndex.toNumber()
                  , a = o.ComponentIndex.toNumber()
                  , s = o.PageGuid
                  , l = o.ReportFile
                  , p = null
                  , g = e;
                if (String.isNullOrEmpty(s))
                    String.isNullOrEmpty(l) || (g = new i,
                    g.loadFile(l));
                else {
                    for (var m = 0, u = e.pages.list; m < u.length; m++) {
                        var d = u[m];
                        d.guid == s ? (p = d,
                        d.enabled = !0,
                        d.skip = !1) : d.enabled = !1
                    }
                    for (var c = e.getComponents(), S = 0, y = c.list; S < y.length; S++) {
                        var f = y[S];
                        if (null != f.interaction && f.interaction.drillDownEnabled && f.interaction.drillDownPageGuid == p.guid && (f.interaction.drillDownPage = null),
                        f.is(r))
                            for (var h = f.as(r), v = 0, A = h.series.list; v < A.length; v++)
                                var E = A[v]
                    }
                }
                e.reportAlias == g.reportAlias && (g.reportAlias = null == p.alias || 0 == p.alias.length ? p.name : p.alias),
                e.reportDescription == g.reportDescription && (g.reportDescription = g.reportAlias);
                var w = t.renderedPages.getByIndex(n)
                  , b = w.components.getByIndex(a);
                if (null != b && null != b.drillDownParameters)
                    for (var x = 0, T = b.drillDownParameters; x < T.length; x++) {
                        var P = T[x];
                        g.setVariable(P.name, P.value)
                    }
                try {} finally {}
                return g
            }
            ,
            e.addBookmarkNode = function(e, t, r) {
                var o = new p;
                o.parent = t;
                var i = e.text.replace("'", "\\'");
                o.title = i,
                o.url = "#" + i,
                o.used = !0,
                r.add(o);
                var n = r.count - 1;
                if (0 != e.bookmarks.count)
                    for (var a = 0; a < e.bookmarks.count; a++)
                        this.addBookmarkNode(e.bookmarks.list[a], n, r)
            }
            ,
            e.getBookmarksContent = function(e, t, r) {
                for (var o = {}, i = 0, n = 0, a = e.renderedPages.list; n < a.length; n++) {
                    var s = a[n];
                    e.renderedPages.getPage(s);
                    for (var l = s.getComponents(), p = 0, g = l.list; p < g.length; p++) {
                        var m = g[p];
                        if (m.enabled) {
                            var u = m.bookmarkValue;
                            null == u && (u = String.empty),
                            u = u.replace("'", "\\'"),
                            u != String.empty && (o[u] || (o[u] = i))
                        }
                    }
                    i++
                }
                var d = [];
                this.addBookmarkNode(e.bookmark, -1, d);
                var c = String.empty;
                c += String.stiFormat("bookmarks = new stiTree('bookmarks','{0}',{1}, imagesForBookmarks);", t, r);
                for (var S = 0; S < d.count; S++) {
                    var y = d[S]
                      , f = String.empty;
                    f = o[y.title] ? String.stiFormat("Page {0}", o[y.title] + 1) : "Page 0",
                    c += String.stiFormat("bookmarks.add({0},{1},'{2}','{3}','{4}');", S, y.parent, y.title, y.url, f)
                }
                return c
            }
            ,
            e
        }();
        t.StiReportHelper = l;
        var p = function() {
            function e() {}
            return e
        }();
        t.StiBookmarkTreeNode = p
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(t) {
        var r = e.Report.Dictionary.StiSelectionMode
          , o = e.Report.Dictionary.StiItemsInitializationType
          , i = e.Report.Engine.StiVariableHelper
          , n = e.Report.Dictionary.StiTypeMode
          , a = e.Report.Dictionary.StiType
          , s = e.System.Enum
          , l = e.Report.Dictionary.StiVariableInitBy
          , p = e.Report.Dictionary.StiDateTimeType
          , g = e.Report.StringRange
          , m = e.Report.FloatRange
          , u = e.Report.CharRange
          , d = e.Report.DateTimeRange
          , c = e.Report.TimeSpanRange
          , S = e.Report.DecimalRange
          , y = e.Report.DoubleRange
          , f = e.Report.ByteRange
          , h = e.Report.ShortRange
          , v = e.Report.IntRange
          , A = e.Report.LongRange
          , E = e.Report.GuidRange
          , w = function() {
            function t() {
                this.en_us_culture = null
            }
            return t.fillDialogInfoItems = function(e) {
                for (var t = !1, r = 0, n = e.dictionary.variables.list; r < n.length; r++) {
                    var a = n[r];
                    if (a.requestFromUser && a.dialogInfo.itemsInitializationType == o.Columns && (null == a.dialogInfo.keys || 0 == a.dialogInfo.keys.length || null == a.dialogInfo.values || 0 == a.dialogInfo.values.length)) {
                        t = !0;
                        break
                    }
                }
                t && (e.dictionary.connect(),
                i.fillItemsOfVariables(e),
                e.dictionary.disconnect())
            }
            ,
            t.getVariableAlias = function(e) {
                if (String.isNullOrEmpty(e.alias))
                    return e.name;
                return e.alias
            }
            ,
            t.getItems = function(t) {
                var r = []
                  , o = null != t.dialogInfo.bindingVariable ? t.dialogInfo.bindingVariable.value : null
                  , i = 0;
                if (null != t.dialogInfo.keys && 0 != t.dialogInfo.keys.length)
                    for (var n = t.dialogInfo.getDialogInfoItems(t.type), a = 0, s = n; a < s.length; a++) {
                        var l = s[a];
                        if (null == o || o == e.System.Convert.toString(l.valueBinding)) {
                            var p = {};
                            p.value = l.value,
                            p.key = l.keyObject,
                            p.keyTo = l.keyObjectTo,
                            t.type == e.System.DateTime || t.type == e.System.NullableDateTime || t.type == e.System.StimulsoftDateTimeRange || t.type == e.System.StimulsoftDateTimeList ? (null != l.keyObject && (p.key = this.getDateTimeObject(l.keyObject)),
                            null != l.keyObjectTo && (p.keyTo = this.getDateTimeObject(l.keyObjectTo))) : (null != p.value && (p.value = p.value.toString()),
                            null != p.key && (p.key = p.key.toString()),
                            null != p.keyTo && (p.keyTo = p.keyTo.toString())),
                            r.add(p)
                        }
                        i++
                    }
                return i > 0 ? r : null
            }
            ,
            t.getDateTimeObject = function(t) {
                if (null != t && !t.is(e.System.DateTime))
                    return t;
                var r = e.System.DateTime.now;
                null != t && t.is(e.System.DateTime) && (r = t);
                var o = {};
                return o.year = r.year,
                o.month = r.month,
                o.day = r.day,
                o.hours = r.hour,
                o.minutes = r.minute,
                o.seconds = r.second,
                null == t && (o.isNull = !0),
                o
            }
            ,
            t.getBasicType = function(e) {
                var t = {
                    ref: n.Value
                };
                return a.getTypeModeFromType(e.type, t),
                s.getName(n, t.ref)
            }
            ,
            t.getStiType = function(t) {
                if (t.type == String || t.type == e.System.StimulsoftStringList || t.type == e.System.StimulsoftStringRange)
                    return "String";
                if (t.type == e.System.Char || t.type == e.System.NullableChar || t.type == e.System.StimulsoftCharRange || t.type == e.System.StimulsoftCharList)
                    return "Char";
                if (t.type == Boolean || t.type == e.System.NullableBoolean || t.type == e.System.StimulsoftBoolList)
                    return "Bool";
                if (t.type == e.System.DateTime || t.type == e.System.NullableDateTime || t.type == e.System.StimulsoftDateTimeList || t.type == e.System.StimulsoftDateTimeRange)
                    return "DateTime";
                if (t.type == e.System.TimeSpan || t.type == e.System.NullableTimeSpan || t.type == e.System.StimulsoftTimeSpanList || t.type == e.System.StimulsoftTimeSpanRange)
                    return "TimeSpan";
                if (t.type == e.System.Guid || t.type == e.System.NullableGuid || t.type == e.System.StimulsoftGuidList || t.type == e.System.StimulsoftGuidRange)
                    return "Guid";
                if (t.type == e.System.Drawing.Image)
                    return "Image";
                if (t.type == e.System.Single || t.type == e.System.Single || t.type == e.System.StimulsoftFloatList || t.type == e.System.StimulsoftFloatRange)
                    return "Float";
                if (t.type == e.System.Double || t.type == e.System.NullableDouble || t.type == e.System.StimulsoftDoubleList || t.type == e.System.StimulsoftDoubleRange)
                    return "Double";
                if (t.type == e.System.Decimal || t.type == e.System.NullableDecimal || t.type == e.System.StimulsoftDecimalList || t.type == e.System.StimulsoftDecimalRange)
                    return "Decimal";
                if (t.type == e.System.Int32 || t.type == e.System.NullableInt32 || t.type == e.System.StimulsoftIntList || t.type == e.System.StimulsoftIntRange)
                    return "Int";
                if (t.type == e.System.UInt32 || t.type == e.System.NullableUInt32)
                    return "Uint";
                if (t.type == e.System.Int16 || t.type == e.System.NullableInt16 || t.type == e.System.StimulsoftShortList || t.type == e.System.StimulsoftShortRange)
                    return "Short";
                if (t.type == e.System.UInt16 || t.type == e.System.NullableUInt16)
                    return "Ushort";
                if (t.type == e.System.Int64 || t.type == e.System.NullableInt64 || t.type == e.System.StimulsoftLongList || t.type == e.System.StimulsoftLongRange)
                    return "Long";
                if (t.type == e.System.UInt64 || t.type == e.System.NullableUInt64)
                    return "Ulong";
                if (t.type == e.System.Byte || t.type == e.System.NullableByte || t.type == e.System.StimulsoftByteList || t.type == e.System.StimulsoftByteRange)
                    return "Byte";
                if (t.type == e.System.SByte || t.type == e.System.NullableSByte)
                    return "Sbyte";
                return String.empty
            }
            ,
            t.applyReportParameters = function(e, t) {
                for (var r in t) {
                    var o = e.dictionary.variables.getByName(r);
                    null != o && this.setVariableValue(e, r, t[r], o)
                }
                e.isRendered = !1
            }
            ,
            t.applyReportBindingVariables = function(t, r) {
                for (var o in r)
                    for (var i = 0, n = t.dictionary.variables.list; i < n.length; i++) {
                        var a = n[i];
                        a.name == o && (a.value = e.System.Convert.toString(r[o])),
                        null != a.dialogInfo.bindingVariable && a.dialogInfo.bindingVariable.name == o && (a.dialogInfo.bindingVariable.value = e.System.Convert.toString(r[o]))
                    }
            }
            ,
            t.setVariableValue = function(t, r, o, i) {
                var n = "."
                  , a = null
                  , s = null
                  , l = null;
                if (null != o && (o.is(Array) && (l = o),
                "object" == typeof o ? s = o : a = e.System.Convert.toString(o)),
                i.type == String)
                    t.setVariable(r, o);
                else if (i.type == e.System.Single || i.type == e.System.Single) {
                    var p = 0;
                    p = parseFloat(a.replaceAll(".", ",").replaceAll(",", n)),
                    t.setVariable(r, p)
                } else if (i.type == e.System.Double || i.type == e.System.NullableDouble) {
                    var p = 0;
                    p = parseFloat(a.replaceAll(".", ",").replaceAll(",", n)),
                    t.setVariable(r, p)
                } else if (i.type == e.System.Decimal || i.type == e.System.NullableDecimal) {
                    var p = 0;
                    p = parseFloat(a.replaceAll(".", ",").replaceAll(",", n)),
                    t.setVariable(r, p)
                } else if (i.type == e.System.Int32 || i.type == e.System.NullableInt32) {
                    var p = 0;
                    p = parseInt(a),
                    t.setVariable(r, p)
                } else if (i.type == e.System.UInt32 || i.type == e.System.NullableUInt32) {
                    var p = 0;
                    p = parseInt(a),
                    t.setVariable(r, p)
                } else if (i.type == e.System.Int16 || i.type == e.System.NullableInt16) {
                    var p = 0;
                    p = parseInt(a),
                    t.setVariable(r, p)
                } else if (i.type == e.System.UInt16 || i.type == e.System.NullableUInt16) {
                    var p = 0;
                    p = parseInt(a),
                    t.setVariable(r, p)
                } else if (i.type == e.System.Int64 || i.type == e.System.NullableInt64) {
                    var p = 0;
                    p = parseInt(a),
                    t.setVariable(r, p)
                } else if (i.type == e.System.UInt64 || i.type == e.System.NullableUInt64) {
                    var p = 0;
                    p = parseInt(a),
                    t.setVariable(r, p)
                } else if (i.type == e.System.Byte || i.type == e.System.NullableByte) {
                    var p = 0;
                    p = parseInt(a),
                    t.setVariable(r, p)
                } else if (i.type == e.System.SByte || i.type == e.System.NullableSByte) {
                    var p = 0;
                    p = parseInt(a),
                    t.setVariable(r, p)
                } else if (i.type == e.System.Char || i.type == e.System.NullableChar) {
                    var p = " ";
                    p = o,
                    t.setVariable(r, p)
                } else if (i.type == Boolean || i.type == e.System.NullableBoolean) {
                    var p = !1;
                    p = "true" == a.toLower(),
                    t.setVariable(r, p)
                } else if (i.type == e.System.DateTime || i.type == e.System.NullableDateTime) {
                    var p = void 0;
                    try {
                        p = new e.System.DateTime(Date.parse(a))
                    } catch (t) {
                        e.System.StiError.showError(t, !1),
                        p = e.System.DateTime.now
                    }
                    t.setVariable(r, p)
                } else if (i.type == e.System.TimeSpan || i.type == e.System.NullableTimeSpan) {
                    var p = void 0;
                    try {
                        p = e.System.TimeSpan.fromString(a)
                    } catch (t) {
                        e.System.StiError.showError(t, !1),
                        p = e.System.TimeSpan.zero
                    }
                    t.setVariable(r, p)
                } else if (i.type == e.System.Guid || i.type == e.System.NullableGuid) {
                    var w = void 0;
                    try {
                        w = new e.System.Guid(a)
                    } catch (t) {
                        e.System.StiError.showError(t, !1),
                        w = e.System.Guid.empty
                    }
                    t.setVariable(r, w)
                } else if (i.type == e.System.StimulsoftStringRange)
                    t.setVariable(r, new g(e.System.Convert.toString(s.from),e.System.Convert.toString(s.to)));
                else if (i.type == e.System.StimulsoftFloatRange) {
                    var b = 0
                      , x = 0;
                    b = parseFloat(e.System.Convert.toString(s.from).replaceAll(",", n)),
                    x = parseFloat(e.System.Convert.toString(s.to).replaceAll(",", n)),
                    t.setVariable(r, new m(b,x))
                } else if (i.type == e.System.StimulsoftDoubleRange) {
                    var b = 0
                      , x = 0;
                    b = parseFloat(e.System.Convert.toString(s.from).replaceAll(",", n)),
                    x = parseFloat(e.System.Convert.toString(s.to).replaceAll(",", n)),
                    t.setVariable(r, new y(b,x))
                } else if (i.type == e.System.StimulsoftDecimalRange) {
                    var b = 0
                      , x = 0;
                    b = parseFloat(e.System.Convert.toString(s.from).replaceAll(",", n)),
                    x = parseFloat(e.System.Convert.toString(s.to).replaceAll(",", n)),
                    t.setVariable(r, new S(b,x))
                } else if (i.type == e.System.StimulsoftIntRange) {
                    var b = 0
                      , x = 0;
                    b = parseInt(e.System.Convert.toString(s.from).replaceAll(",", n)),
                    x = parseInt(e.System.Convert.toString(s.to).replaceAll(",", n)),
                    t.setVariable(r, new v(b,x))
                } else if (i.type == e.System.StimulsoftShortRange) {
                    var b = 0
                      , x = 0;
                    b = parseInt(e.System.Convert.toString(s.from).replaceAll(",", n)),
                    x = parseInt(e.System.Convert.toString(s.to).replaceAll(",", n)),
                    t.setVariable(r, new h(b,x))
                } else if (i.type == e.System.StimulsoftLongRange) {
                    var b = 0
                      , x = 0;
                    b = parseInt(e.System.Convert.toString(s.from).replaceAll(",", n)),
                    x = parseInt(e.System.Convert.toString(s.to).replaceAll(",", n)),
                    t.setVariable(r, new A(b,x))
                } else if (i.type == e.System.StimulsoftByteRange) {
                    var b = 0
                      , x = 0;
                    b = parseInt(e.System.Convert.toString(s.from).replaceAll(",", n)),
                    x = parseInt(e.System.Convert.toString(s.to).replaceAll(",", n)),
                    t.setVariable(r, new f(b,x))
                } else if (i.type == e.System.StimulsoftCharRange) {
                    var b = 0
                      , x = 0;
                    b = e.System.Convert.toString(s.from),
                    x = e.System.Convert.toString(s.to),
                    t.setVariable(r, new u(b,x))
                } else if (i.type == e.System.StimulsoftDateTimeRange) {
                    var b = e.System.DateTime.now
                      , x = e.System.DateTime.now;
                    b = new e.System.DateTime(Date.parse(s.from)),
                    x = new e.System.DateTime(Date.parse(s.to)),
                    t.setVariable(r, new d(b,x))
                } else if (i.type == e.System.StimulsoftTimeSpanRange) {
                    var b = e.System.TimeSpan.zero
                      , x = e.System.TimeSpan.zero;
                    b = e.System.TimeSpan.fromString(s.from),
                    x = e.System.TimeSpan.fromString(s.to),
                    t.setVariable(r, new c(b,x))
                } else if (i.type == e.System.StimulsoftGuidRange) {
                    var b = e.System.Guid.empty
                      , x = e.System.Guid.empty;
                    try {
                        b = new e.System.Guid(e.System.Convert.toString(s.from)),
                        x = new e.System.Guid(e.System.Convert.toString(s.to))
                    } catch (t) {
                        e.System.StiError.showError(t, !1)
                    }
                    t.setVariable(r, new E(b,x))
                } else if (i.type == e.System.StimulsoftStringList) {
                    for (var T = [], P = 0, R = l; P < R.length; P++) {
                        var p = R[P];
                        T.add(p.toString())
                    }
                    t.setVariable(r, T),
                    null != i.dialogInfo.keys && 0 != i.dialogInfo.keys.length || (i.dialogInfo.keys = T.toArray())
                } else if (i.type == e.System.StimulsoftFloatList || i.type == e.System.StimulsoftDoubleList || i.type == e.System.StimulsoftDecimalList || i.type == e.System.StimulsoftByteList || i.type == e.System.StimulsoftShortList || i.type == e.System.StimulsoftLongList) {
                    for (var T = [], I = 0, D = l; I < D.length; I++) {
                        var p = D[I];
                        T.add(p.toNumber())
                    }
                    t.setVariable(r, T),
                    null != i.dialogInfo.keys && 0 != i.dialogInfo.keys.length || (i.dialogInfo.keys = T.toArray().select(function(e) {
                        return e.toString()
                    }).toArray());
                } else if (i.type == e.System.StimulsoftIntList) {
                    for (var T = [], C = [], V = 0, k = l; V < k.length; V++) {
                        var p = k[V];
                        T.add(p.toNumber()),
                        C.add(p.toString())
                    }
                    t.setVariable(r, T),
                    null != i.dialogInfo.keys && 0 != i.dialogInfo.keys.length || (i.dialogInfo.keys = C)
                } else if (i.type == e.System.StimulsoftCharList) {
                    for (var T = [], B = 0, F = l; B < F.length; B++) {
                        var p = F[B];
                        T.add(p.toString())
                    }
                    t.setVariable(r, T),
                    null != i.dialogInfo.keys && 0 != i.dialogInfo.keys.length || (i.dialogInfo.keys = T.toArray().select(function(e) {
                        return e.toString()
                    }).toArray())
                } else if (i.type == e.System.StimulsoftBoolList) {
                    for (var T = [], M = 0, H = l; M < H.length; M++) {
                        var p = H[M];
                        T.add(p.toBoolean())
                    }
                    t.setVariable(r, T),
                    null != i.dialogInfo.keys && 0 != i.dialogInfo.keys.length || (i.dialogInfo.keys = T.toArray().select(function(e) {
                        return e.toString
                    }).toArray())
                }
            }
            ,
            t.getVariables = function(t) {
                this.fillDialogInfoItems(t);
                for (var o = {}, i = {}, n = 0, a = 0, g = t.dictionary.variables.list; a < g.length; a++) {
                    var m = g[a];
                    if (m.requestFromUser) {
                        null != m.dialogInfo.bindingVariable && (i[m.dialogInfo.bindingVariable.name] = !0);
                        var u = {};
                        u.name = m.name,
                        u.alias = this.getVariableAlias(m),
                        u.basicType = this.getBasicType(m),
                        u.type = this.getStiType(m),
                        u.allowUserValues = m.dialogInfo.allowUserValues,
                        m.selection == r.FromVariable ? u.value = m.initBy == l.Value ? m.valueObject : t.getVariable(m.name) : m.selection == r.First ? u.value = t.getVariable(m.name) : u.value = "",
                        u.key = u.value,
                        u.keyTo = String.empty,
                        u.dateTimeType = s.getName(p, m.dialogInfo.dateTimeType);
                        var d = this.getItems(m);
                        u.items = d;
                        var c = null;
                        if (null != d && d.count > 0)
                            for (var S = e.System.Convert.toString(u.value), y = 0, f = d; y < f.length; y++) {
                                var h = f[y];
                                if (e.System.Convert.toString(h.key) == S) {
                                    c = h;
                                    break
                                }
                            }
                        if ("Value" == u.basicType || "NullableValue" == u.basicType) {
                            null != c && (u.key = c.key,
                            u.value = c.value,
                            (m.dialogInfo.allowUserValues || null == u.value || "string" == typeof u.value && "" == u.value) && (u.value = u.key));
                            for (var v = 0, A = t.dictionary.variables.list; v < A.length; v++) {
                                var E = A[v];
                                null != E.dialogInfo.bindingVariable && E.dialogInfo.bindingVariable.name == m.name && (E.dialogInfo.bindingVariable.valueObject = u.key)
                            }
                            "DateTime" == u.type && (u.key = this.getDateTimeObject(u.key))
                        }
                        if ("Range" == u.basicType && ("DateTime" == u.type ? u.key = this.getDateTimeObject(m.initBy == l.Value ? m.valueObject.fromObject : t.getVariable(m.name).fromObject) : u.key = m.initBy == l.Value ? m.valueObject.fromObject.toString() : t.getVariable(m.name).fromObject.toString(),
                        "DateTime" == u.type ? u.keyTo = this.getDateTimeObject(m.initBy == l.Value ? m.valueObject.toObject : t.getVariable(m.name).toObject) : u.keyTo = m.initBy == l.Value ? m.valueObject.toObject.toString() : t.getVariable(m.name).toObject.toString()),
                        "List" == u.basicType) {
                            var w = t.getVariable(m.name);
                            u.value = w,
                            u.key = w
                        }
                        "DateTime" != u.type,
                        o[n.toString()] = u,
                        n++
                    }
                }
                if (n > 0) {
                    for (var b in i)
                        for (var x in o)
                            o[x].name == b && (o[x].binding = !0);
                    return o
                }
                return null
            }
            ,
            t
        }();
        t.StiVariablesHelper = w
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(t) {
        var r = e.System.Drawing.Color
          , o = e.Report.Export.StiHtmlExportMode
          , i = function() {
            function e() {
                this.backgroundColor = r.white,
                this.rightToLeft = !1,
                this.fullScreenMode = !1,
                this.scrollbarsMode = !1,
                this.openLinksTarget = "_self",
                this.openExportedReportTarget = "_blank",
                this.showTooltips = !0,
                this.showTooltipsHelp = !0,
                this.pageAlignment = t.StiContentAlignment.Center,
                this.showPageShadow = !0,
                this.pageBorderColor = r.gray,
                this.bookmarksPrint = !1,
                this.bookmarksTreeWidth = 180,
                this.parametersPanelMaxHeight = 300,
                this.parametersPanelColumnsCount = 2,
                this.parametersPanelDateFormat = String.empty,
                this.interfaceType = t.StiInterfaceType.Auto,
                this.chartRenderType = t.StiChartRenderType.AnimatedVector,
                this.htmlRenderMode = o.Table,
                this.datePickerFirstDayOfWeek = t.StiFirstDayOfWeek.Monday
            }
            return e
        }();
        t.StiAppearanceOptions = i
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(e) {
        var t = function() {
            function e() {
                this.showEmailDialog = !0,
                this.showExportDialog = !0,
                this.defaultEmailAddress = "",
                this.defaultEmailSubject = "",
                this.defaultEmailMessage = ""
            }
            return e
        }();
        e.StiEmailOptions = t
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(e) {
        var t = function() {
            function e() {
                this.storeExportSettings = !0,
                this.showExportDialog = !0,
                this.showExportToDocument = !0,
                this.showExportToPdf = !0,
                this.showExportToXps = !1,
                this.showExportToPowerPoint = !1,
                this.showExportToHtml = !0,
                this.showExportToHtml5 = !0,
                this.showExportToMht = !1,
                this.showExportToText = !1,
                this.showExportToRtf = !1,
                this.showExportToWord2007 = !0,
                this.showExportToOpenDocumentWriter = !1,
                this.showExportToExcel = !1,
                this.showExportToExcelXml = !1,
                this.showExportToExcel2007 = !0,
                this.showExportToOpenDocumentCalc = !1,
                this.showExportToCsv = !0,
                this.showExportToDbf = !1,
                this.showExportToXml = !1,
                this.showExportToDif = !1,
                this.showExportToSylk = !1,
                this.showExportToImageBmp = !1,
                this.showExportToImageGif = !1,
                this.showExportToImageJpeg = !1,
                this.showExportToImagePcx = !1,
                this.showExportToImagePng = !1,
                this.showExportToImageTiff = !1,
                this.showExportToImageMetafile = !1,
                this.showExportToImageSvg = !1,
                this.showExportToImageSvgz = !1
            }
            return e
        }();
        e.StiExportsOptions = t
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(t) {
        var r = e.System.Drawing.Color
          , o = function() {
            function o() {
                this.visible = !0,
                this.backgroundColor = r.empty,
                this.borderColor = r.empty,
                this.fontColor = r.empty,
                this.fontFamily = "Arial",
                this.alignment = t.StiContentAlignment.Default,
                this.showButtonCaptions = !0,
                this.showPrintButton = !0,
                this.showSaveButton = !0,
                this.showSendEmailButton = !1,
                this.showFindButton = !0,
                this.showBookmarksButton = !0,
                this.showParametersButton = !0,
                this.showEditorButton = !0,
                this.showFullScreenButton = !0,
                this.showFirstPageButton = !0,
                this.showPreviousPageButton = !0,
                this.showCurrentPageControl = !0,
                this.showNextPageButton = !0,
                this.showLastPageButton = !0,
                this.showZoomButton = !0,
                this.showViewModeButton = !0,
                this.showDesignButton = !1,
                this.showAboutButton = !0,
                this.printDestination = t.StiPrintDestination.Default,
                this.viewMode = t.StiWebViewMode.OnePage,
                this.multiPageWidthCount = 2,
                this.multiPageHeightCount = 2,
                this._zoom = 100,
                this.menuAnimation = !0,
                this.showMenuMode = t.StiShowMenuMode.Click
            }
            return Object.defineProperty(o.prototype, "zoom", {
                get: function() {
                    return this._zoom
                },
                set: function(t) {
                    t == e.Viewer.StiZoomMode.PageWidth || t == e.Viewer.StiZoomMode.PageHeight || t >= 10 && t <= 500 ? this._zoom = t : t > 500 ? this._zoom = 500 : t < 10 ? this._zoom = 10 : this._zoom = 100
                },
                enumerable: !0,
                configurable: !0
            }),
            o
        }();
        t.StiToolbarOptions = o
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(e) {
        !function(e) {
            e[e.Left = 0] = "Left",
            e[e.Center = 1] = "Center",
            e[e.Right = 2] = "Right",
            e[e.Default = 3] = "Default"
        }(e.StiContentAlignment || (e.StiContentAlignment = {}));
        var t = e.StiContentAlignment;
        !function(e) {
            e[e.Auto = 0] = "Auto",
            e[e.Mouse = 1] = "Mouse",
            e[e.Touch = 2] = "Touch"
        }(e.StiInterfaceType || (e.StiInterfaceType = {}));
        var r = e.StiInterfaceType;
        !function(e) {
            e[e.Vector = 2] = "Vector",
            e[e.AnimatedVector = 3] = "AnimatedVector"
        }(e.StiChartRenderType || (e.StiChartRenderType = {}));
        var o = e.StiChartRenderType;
        !function(e) {
            e[e.Default = 0] = "Default",
            e[e.Pdf = 1] = "Pdf",
            e[e.Direct = 2] = "Direct",
            e[e.WithPreview = 3] = "WithPreview"
        }(e.StiPrintDestination || (e.StiPrintDestination = {}));
        var i = e.StiPrintDestination;
        !function(e) {
            e[e.OnePage = 0] = "OnePage",
            e[e.WholeReport = 1] = "WholeReport",
            e[e.MultiPage = 2] = "MultiPage"
        }(e.StiWebViewMode || (e.StiWebViewMode = {}));
        var n = e.StiWebViewMode;
        !function(e) {
            e[e.Click = 0] = "Click",
            e[e.Hover = 1] = "Hover"
        }(e.StiShowMenuMode || (e.StiShowMenuMode = {}));
        var a = e.StiShowMenuMode;
        !function(e) {
            e[e.PageWidth = -1] = "PageWidth",
            e[e.PageHeight = -2] = "PageHeight"
        }(e.StiZoomMode || (e.StiZoomMode = {}));
        var s = e.StiZoomMode;
        !function(e) {
            e[e.ExportReport = 1] = "ExportReport",
            e[e.SendEmail = 2] = "SendEmail"
        }(e.StiExportAction || (e.StiExportAction = {}));
        var l = e.StiExportAction;
        !function(e) {
            e[e.Monday = 0] = "Monday",
            e[e.Sunday = 1] = "Sunday"
        }(e.StiFirstDayOfWeek || (e.StiFirstDayOfWeek = {}));
        var p = e.StiFirstDayOfWeek
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(e) {
        var t = function() {
            function e() {
                this.email = null,
                this.subject = null,
                this.message = null
            }
            return e
        }();
        e.StiEmailSettings = t
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(t) {
        var r = e.Report.Export.StiCsvExportSettings
          , o = e.Report.Export.StiCsvExportService
          , i = e.Report.Export.StiHtmlChartType
          , n = e.Report.Export.StiWord2007ExportService
          , a = e.Report.Export.StiWord2007ExportSettings
          , s = e.System.Drawing.ColorTranslator
          , l = e.System.IO.TextWriter
          , p = e.Report.Export.StiHtmlExportService
          , g = e.Report.Export.StiHtmlTextWriter
          , m = e.Report.Export.StiHtmlExportSettings
          , u = e.Report.StiPagesRange
          , d = e.Report.StiRangeType
          , c = e.Report.Export.StiHtmlExportMode
          , S = e.Report.Export.StiHtmlExportQuality
          , y = e.Report.Export.StiHtmlExportBookmarksMode
          , f = e.Base.Drawing.StiBrush
          , h = e.Report.StiExportFormat
          , v = e.Base.StiGZipHelper
          , A = e.Report.Export.StiPdfExportSettings
          , E = e.Report.Export.StiPdfExportService
          , w = e.System.IO.MemoryStream
          , b = e.Report.Export.StiExcel2007ExportService
          , x = e.Report.Export.StiExcelExportSettings
          , T = e.System.Promise
          , P = function() {
            function P(e, r, o) {
                this.drillDownReportCache = {},
                this.onBeginProcessData = null,
                this.onEndProcessData = null,
                this.onPrintReport = null,
                this.onBeginExportReport = null,
                this.onEndExportReport = null,
                this.onEmailReport = null,
                this.onDesignReport = null,
                this.reportCache = {},
                this._visible = !0,
                this._options = e || new t.StiViewerOptions,
                this._viewerId = r || "StiViewer",
                this._options.viewerId = this._viewerId,
                this._renderAfterCreate = void 0 === o || o,
                this._renderAfterCreate && this.renderHtml()
            }
            return Object.defineProperty(P.prototype, "viewerId", {
                get: function() {
                    return this._viewerId
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(P.prototype, "options", {
                get: function() {
                    return this._options
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(P.prototype, "jsObject", {
                get: function() {
                    return this._jsObject
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(P.prototype, "currentReportGuid", {
                get: function() {
                    return this._currentReportGuid
                },
                set: function(e) {
                    this._currentReportGuid = e
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(P.prototype, "reportTemplate", {
                get: function() {
                    var e = this.currentReportGuid.split("|")[0];
                    return this.reportCache[e]
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(P.prototype, "report", {
                get: function() {
                    if (null == this.currentReportGuid)
                        return null;
                    return this.reportCache[this.currentReportGuid]
                },
                set: function(e) {
                    this.currentReportGuid = null,
                    this.reportCache = {},
                    null != e && (this.reportCache[e.reportGuid] = e,
                    this.currentReportGuid = e.reportGuid),
                    this.jsObject && this.jsObject.assignReport(e)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(P.prototype, "visible", {
                get: function() {
                    return this._visible
                },
                set: function(e) {
                    this._visible = e,
                    this._jsObject && (this._jsObject.controls.viewer.style.display = e ? String.empty : "none")
                },
                enumerable: !0,
                configurable: !0
            }),
            P.prototype.renderHtml = function(i) {
                i && "string" == typeof i && (i = document.getElementById(i));
                var s = String.isNullOrEmpty(this.options.width) ? "100%" : this.options.width
                  , u = String.isNullOrEmpty(this.options.height) ? this.options.appearance.scrollbarsMode ? "600px" : "100%" : this.options.height
                  , d = String.stiFormat("#{0:X2}{1:X2}{2:X2}", this.options.appearance.backgroundColor.r, this.options.appearance.backgroundColor.g, this.options.appearance.backgroundColor.b)
                  , c = "<div style='width: " + s + "; height: " + u + "; background: " + d + ";";
                this.visible || (c += " display: none;"),
                c += "' id='" + this.viewerId + "'><div id='" + this.viewerId + "_JsViewerMainPanel' class='stiJsViewerMainPanel'></div></div>",
                i && void 0 !== i.innerHTML ? i.innerHTML = c : document.write(c);
                var S = this.options.toParameters();
                S.loc = t.StiCollectionsHelper.GetLocalizationItems(),
                this._jsObject = new StiJsViewer(S),
                this._jsObject.viewer = this,
                e.System.StiError.errorMessageForm = e.System.StiError.errorMessageForm || this.jsObject.controls.forms.errorMessageForm || this.jsObject.InitializeErrorMessageForm(),
                this.jsObject.assignReport = function(t) {
                    var r = this;
                    if (null != this.viewer.report && (this.viewer.report.onBeginProcessData = null,
                    this.viewer.report.onEndProcessData = null),
                    this.viewer.drillDownReportCache = {},
                    t) {
                        this.controls.processImage.show();
                        var o = this;
                        t.onBeginProcessData = function(e, t) {
                            r.viewer.invokeBeginProcessData(e, t)
                        }
                        ,
                        t.onEndProcessData = function(e) {
                            r.viewer.invokeEndProcessData(e)
                        }
                        ;
                        var i = function() {
                            r.options.isParametersReceived = !1,
                            r.options.paramsVariables = null,
                            r.controls.drillDownPanel.reset(),
                            setTimeout(function() {
                                r.reportParams.reportGuid = t.reportGuid,
                                r.reportParams.paramsGuid = null,
                                r.reportParams.drillDownGuid = null,
                                r.reportParams.drillDownParameters = [],
                                r.reportParams.pageNumber = 0,
                                r.reportParams.pagesCount = t.renderedPages.count,
                                r.reportParams.zoom != e.Viewer.StiZoomMode.PageWidth && r.reportParams.zoom != e.Viewer.StiZoomMode.PageHeight || (r.reportParams.autoZoom = r.options.toolbar.zoom,
                                r.reportParams.zoom = 100),
                                r.postAction(null)
                            }, 50)
                        };
                        t.isRendered ? i() : t.renderAsync(function() {
                            i()
                        })
                    }
                }
                ,
                this.jsObject.getReportParameters = function(e) {
                    null != this.viewer.report && (this.viewer.currentReportGuid = String.isNullOrEmpty(e.reportGuid) ? this.viewer.report.reportGuid : e.reportGuid,
                    String.isNullOrEmpty(e.drillDownGuid) || (this.viewer.currentReportGuid += "|" + e.drillDownGuid),
                    t.StiEditableFieldsHelper.applyEditableFieldsToReport(this.viewer.report, e.editableParameters),
                    "DrillDown" == e.action && (e.pageNumber = 0),
                    "Variables" != e.action && "Collapsing" != e.action || (e.pageNumber = Math.min(e.pageNumber, this.viewer.report.renderedPages.count - 1)));
                    var r = {};
                    return r.action = e.action,
                    r.pagesArray = this.viewer.getPagesArray(this.viewer.report, {
                        viewMode: e.viewMode,
                        multiPageWidthCount: e.multiPageWidthCount,
                        multiPageHeightCount: e.multiPageHeightCount,
                        multiPageContainerWidth: e.multiPageContainerWidth,
                        multiPageContainerHeight: e.multiPageContainerHeight,
                        multiPageMargins: e.multiPageMargins,
                        pageNumber: e.pageNumber,
                        zoom: e.zoom,
                        openLinksTarget: this.options.appearance.openLinksTarget
                    }, e),
                    "GetPages" != e.action && (r.pagesCount = 0,
                    null != this.viewer.report && (r.reportGuid = this.viewer.report.reportGuid,
                    r.isEditableReport = t.StiEditableFieldsHelper.checkEditableReport(this.viewer.report),
                    r.pagesCount = this.viewer.report.renderedPages.count,
                    r.reportFileName = this.viewer.getReportFileName(),
                    r.interactionCollapsingStates = this.viewer.report.interactionCollapsingStates),
                    r.paramsGuid = e.paramsGuid,
                    r.drillDownGuid = e.drillDownGuid,
                    r.zoom = e.zoom,
                    r.viewMode = e.viewMode,
                    "DrillDown" == e.action && (r.drillDownParameters = e.drillDownParameters),
                    null != this.viewer.report.bookmark && this.viewer.report.bookmark.bookmarks.count > 0 && (r.bookmarksContent = t.StiReportHelper.getBookmarksContent(this.viewer.report, e.viewerId, "OnePage" == e.viewMode ? e.pageNumber : -1))),
                    r
                }
                ,
                this.jsObject.postAjax = function(t) {
                    var r = this
                      , o = this.createPostParameters(t, !0)
                      , i = e.System.Convert.fromBase64StringText(o.jsviewer_parameters)
                      , n = JSON.parse(i);
                    n.action = o.jsviewer_action;
                    var a = this.getReportParameters(n);
                    setTimeout(function() {
                        r.showReportPage(a, r)
                    }, 50)
                }
                ,
                this.jsObject.postDesign = function() {
                    this.controls.processImage.show(),
                    this.viewer.invokeDesignReport(),
                    this.controls.processImage.hide()
                }
                ,
                this.jsObject.postEmail = function(e, r) {
                    this.postExport(e, r, t.StiExportAction.SendEmail)
                }
                ,
                this.jsObject.postExport = function(i, s, u) {
                    var d = h[i]
                      , c = null;
                    u == t.StiExportAction.SendEmail && (c = new t.StiEmailSettings,
                    c.email = s.Email,
                    c.message = s.Message,
                    c.subject = s.Subject);
                    var S = this.viewer;
                    switch (d) {
                    case h.Document:
                        var y = S.getReportFileName()
                          , f = S.invokeBeginExportReport(null, d, y);
                        if (null != f) {
                            if (f.preventDefault)
                                break;
                            y = f.fileName
                        }
                        var T = S.report.saveDocumentToJsonString();
                        if (f = S.invokeEndExportReport(d, y, T),
                        null != f) {
                            if (f.preventDefault)
                                break;
                            y = f.fileName
                        }
                        if ("Mdz" == s.Format) {
                            var P = v.pack(e.System.Text.Encoding.UTF8.getBytes(T));
                            Object.saveAs(P, y + ".mdz")
                        } else
                            Object.saveAs(T, y + ".mdc", "application/json;charset=utf-8");
                        break;
                    case h.Html:
                        var R = new m;
                        R.useWatermarkMargins = !1,
                        R.exportMode = S.options.appearance.htmlRenderMode,
                        t.StiExportsHelper.applyExportSettings(d, s, R);
                        var I = S.getReportFileName()
                          , D = S.invokeBeginExportReport(R, d, I);
                        if (null != D) {
                            if (D.preventDefault)
                                break;
                            I = D.fileName
                        }
                        var C = new p
                          , V = new l
                          , k = new g(V);
                        C.exportToAsync(function() {
                            var e = V.getStringBuilder().toString();
                            if (u == t.StiExportAction.SendEmail)
                                return void S.invokeEmailReport(c, d, I, e);
                            if (D = S.invokeEndExportReport(d, I, e),
                            null != D) {
                                if (D.preventDefault)
                                    return;
                                I = D.fileName
                            }
                            Object.saveAs(e, I + ".html", "text/html;charset=utf-8")
                        }, S.report, k, R);
                        break;
                    case h.Html5:
                        var R = new m;
                        t.StiExportsHelper.applyExportSettings(d, s, R);
                        var B = S.getReportFileName()
                          , F = S.invokeBeginExportReport(R, d, B);
                        if (null != F) {
                            if (F.preventDefault)
                                break;
                            B = F.fileName
                        }
                        var C = new p
                          , M = new l
                          , k = new g(M);
                        C.exportToAsync(function() {
                            var e = M.getStringBuilder().toString();
                            if (u == t.StiExportAction.SendEmail)
                                return void S.invokeEmailReport(c, d, B, e);
                            if (F = S.invokeEndExportReport(d, B, e),
                            null != F) {
                                if (F.preventDefault)
                                    return;
                                B = F.fileName
                            }
                            Object.saveAs(e, B + ".html", "text/html;charset=utf-8")
                        }, S.report, k, R);
                        break;
                    case h.Pdf:
                        var R = new A;
                        t.StiExportsHelper.applyExportSettings(d, s, R);
                        var H = S.getReportFileName()
                          , O = S.invokeBeginExportReport(R, d, H);
                        if (null != O) {
                            if (O.preventDefault)
                                break;
                            H = O.fileName
                        }
                        var C = new E
                          , j = new w;
                        C.exportToAsync(function() {
                            var e = j.toArray();
                            if (u == t.StiExportAction.SendEmail)
                                return void S.invokeEmailReport(c, d, H, e);
                            if (O = S.invokeEndExportReport(d, H, e),
                            null != O) {
                                if (O.preventDefault)
                                    return;
                                H = O.fileName
                            }
                            Object.saveAs(e, H + ".pdf", "application/pdf")
                        }, S.report, j, R);
                        break;
                    case h.Excel2007:
                        var R = new x;
                        t.StiExportsHelper.applyExportSettings(d, s, R);
                        var Q = S.getReportFileName()
                          , N = S.invokeBeginExportReport(R, d, Q);
                        if (null != N) {
                            if (N.preventDefault)
                                break;
                            Q = N.fileName
                        }
                        var C = new b
                          , W = new w;
                        C.exportToAsync(function() {
                            var e = W.toArray();
                            if (u == t.StiExportAction.SendEmail)
                                return void S.invokeEmailReport(c, d, Q, e);
                            if (N = S.invokeEndExportReport(d, Q, e),
                            null != N) {
                                if (N.preventDefault)
                                    return;
                                Q = N.fileName
                            }
                            Object.saveAs(e, Q + ".xlsx", "application/xlsx")
                        }, S.report, W, R);
                        break;
                    case h.Word2007:
                        var R = new a;
                        t.StiExportsHelper.applyExportSettings(d, s, R);
                        var L = S.getReportFileName()
                          , U = S.invokeBeginExportReport(R, d, L);
                        if (null != U) {
                            if (U.preventDefault)
                                break;
                            L = U.fileName
                        }
                        var C = new n
                          , z = new w;
                        C.exportToAsync(function() {
                            var e = z.toArray();
                            if (u == t.StiExportAction.SendEmail)
                                return void S.invokeEmailReport(c, d, L, e);
                            if (U = S.invokeEndExportReport(d, L, e),
                            null != U) {
                                if (U.preventDefault)
                                    return;
                                L = U.fileName
                            }
                            Object.saveAs(e, L + ".docx", "application/xlsx")
                        }, S.report, z, R);
                        break;
                    case h.Csv:
                        var R = new r;
                        t.StiExportsHelper.applyExportSettings(d, s, R);
                        var G = S.getReportFileName()
                          , J = S.invokeBeginExportReport(R, d, G);
                        if (null != J) {
                            if (J.preventDefault)
                                break;
                            G = J.fileName
                        }
                        var C = new o
                          , X = new w;
                        C.exportToAsync(function() {
                            var e = X.toArray();
                            if (u == t.StiExportAction.SendEmail)
                                return void S.invokeEmailReport(c, d, G, e);
                            if (J = S.invokeEndExportReport(d, G, e),
                            null != J) {
                                if (J.preventDefault)
                                    return;
                                G = J.fileName
                            }
                            Object.saveAs(e, G + ".csv", "application/csv")
                        }, S.report, X, R)
                    }
                }
                ,
                this.jsObject.postPrint = function(e) {
                    var t = this.viewer
                      , r = t.invokePrintReport(e);
                    if (null == r || !r.preventDefault) {
                        var o = t.report;
                        switch (null != r && (o = r.report),
                        e) {
                        case "PrintPdf":
                            o.printToPdf(null);
                            break;
                        case "PrintWithPreview":
                            var i = new m
                              , n = new p
                              , a = new l
                              , s = new g(a);
                            i.exportMode = t.options.appearance.htmlRenderMode,
                            i.useWatermarkMargins = !1,
                            i.removeEmptySpaceAtBottom = !1,
                            n.exportToAsync(function() {
                                var e = a.getStringBuilder().toString()
                                  , r = new Blob([e],{
                                    type: "text/html"
                                });
                                if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                                    var o = t.getReportFileName();
                                    window.navigator.msSaveOrOpenBlob(r, o + ".html")
                                } else {
                                    var i = URL.createObjectURL(r);
                                    window.open(i)
                                }
                            }, o, s, i);
                            break;
                        case "PrintWithoutPreview":
                            o.print(null, t.options.appearance.htmlRenderMode)
                        }
                    }
                }
                ,
                this.jsObject.postInteraction = function(e) {
                    var r = this.viewer
                      , o = r.report;
                    if (null != o) {
                        if ("InitVars" == e.action) {
                            e.variables && t.StiVariablesHelper.applyReportBindingVariables(r.report, e.variables);
                            var i = r.report.isDocument ? null : t.StiVariablesHelper.getVariables(r.report);
                            this.initializeParametersPanel(i, this)
                        }
                        "Variables" != e.action && "Sorting" != e.action && "Collapsing" != e.action || (r.jsObject.controls.processImage.show(),
                        setTimeout(function() {
                            t.StiVariablesHelper.applyReportParameters(o, e.variables),
                            o.isRendered || o.renderAsync(function() {
                                r.jsObject.postAjax(e)
                            })
                        }, 50)),
                        "Sorting" == e.action ? (r.jsObject.controls.processImage.show(),
                        setTimeout(function() {
                            t.StiReportHelper.applySorting(o, e.sortingParameters),
                            o.isRendered || o.renderAsync(function() {
                                r.jsObject.postAjax(e)
                            })
                        }, 50)) : "Collapsing" == e.action && (r.jsObject.controls.processImage.show(),
                        setTimeout(function() {
                            t.StiReportHelper.applyCollapsing(o, e.collapsingParameters),
                            o.isRendered || o.renderAsync(function() {
                                r.jsObject.postAjax(e)
                            })
                        }, 50)),
                        "DrillDown" == e.action && (r.jsObject.controls.processImage.show(),
                        e.drillDownParameters = this.reportParams.drillDownParameters.concat(e.drillDownParameters),
                        e.drillDownGuid = hex_md5(JSON.stringify(e.drillDownParameters)),
                        setTimeout(function() {
                            var o = t.StiReportHelper.cloneReport(r.reportTemplate)
                              , i = r.report
                              , n = 0
                              , a = function() {
                                i = t.StiReportHelper.applyDrillDown(o, i, e.drillDownParameters[n]),
                                i.isRendered = !1,
                                i.isInteractionRendering = !0,
                                i.renderAsync(function() {
                                    i.isInteractionRendering = !1,
                                    n < e.drillDownParameters.length - 1 ? (n++,
                                    a()) : (r.reportCache[i.reportGuid + "|" + e.drillDownGuid] = i,
                                    r.jsObject.postAjax(e))
                                })
                            };
                            a()
                        }, 50))
                    }
                }
                ,
                this.jsObject.controls.aboutPanel.style.backgroundImage = "url(data:image/png;base64," + "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" + "jIvx/wMKh7bFAFwqVQAAAABJRU5ErkJggg==)",
                this._renderAfterCreate || this.jsObject.assignReport(this.report)
            }
            ,
            P.prototype.invokeBeginProcessData = function(e, t) {
                this.onBeginProcessData && this.onBeginProcessData.is(Function) && (e.sender = "Viewer",
                this.onBeginProcessData(e, t))
            }
            ,
            P.prototype.invokeEndProcessData = function(e) {
                this.onEndProcessData && this.onEndProcessData.is(Function) && (e.sender = "Viewer",
                this.onEndProcessData(e))
            }
            ,
            P.prototype.invokePrintReport = function(e) {
                if (this.onPrintReport && this.onPrintReport.is(Function)) {
                    var t = {
                        sender: "Viewer",
                        event: "PrintReport",
                        preventDefault: !1,
                        fileName: this.getReportFileName(),
                        printAction: e,
                        report: this.report
                    };
                    return this.onPrintReport(t),
                    t
                }
                return null
            }
            ,
            P.prototype.invokeBeginExportReport = function(e, t, r) {
                if (this.onBeginExportReport && this.onBeginExportReport.is(Function)) {
                    var o = {
                        sender: "Viewer",
                        event: "BeginExportReport",
                        preventDefault: !1,
                        settings: e,
                        format: h[t],
                        fileName: r
                    };
                    return this.onBeginExportReport(o),
                    o
                }
                return null
            }
            ,
            P.prototype.invokeEndExportReport = function(e, t, r) {
                if (this.onEndExportReport && this.onEndExportReport.is(Function)) {
                    var o = {
                        sender: "Viewer",
                        event: "EndExportReport",
                        preventDefault: !1,
                        format: h[e],
                        fileName: t,
                        data: r
                    };
                    return this.onEndExportReport(o),
                    o
                }
                return null
            }
            ,
            P.prototype.invokeEmailReport = function(e, t, r, o) {
                if (this.onEmailReport && this.onEmailReport.is(Function)) {
                    var i = {
                        sender: "Viewer",
                        event: "EmailReport",
                        settings: e,
                        format: h[t],
                        fileName: r,
                        data: o
                    };
                    this.onEmailReport(i)
                }
                return null
            }
            ,
            P.prototype.invokeDesignReport = function() {
                if (this.onDesignReport && this.onDesignReport.is(Function)) {
                    var e = {
                        sender: "Viewer",
                        event: "DesignReport",
                        fileName: this.getReportFileName(),
                        report: this.report
                    };
                    this.onDesignReport(e)
                }
            }
            ,
            P.prototype.callRemoteApi = function(t, r) {
                r === void 0 && (r = 0);
                var o = new T;
                try {
                    var i = new XMLHttpRequest;
                    i.open("post", StiOptions.WebServer.url, !0),
                    i.timeout = r > 0 ? r : StiOptions.WebServer.timeout,
                    i.onload = function() {
                        if (200 == i.status) {
                            var e = i.responseText;
                            i.abort(),
                            o.callTry(e)
                        }
                    }
                    ,
                    i.onerror = function(e) {
                        o.callCatch("Connect to remote error: [" + i.status + "] " + i.statusText)
                    }
                    ,
                    i.send(JSON.stringify(t))
                } catch (t) {
                    e.System.StiError.showError(t, !1),
                    o.callCatch(t.message)
                }
                return o.catch(function(e) {
                    i && i.abort()
                }),
                o
            }
            ,
            P.prototype.getReportPage = function(e, r, o, n, a) {
                var p = new m;
                switch (p.pageRange = new u(d.CurrentPage,"",o),
                p.zoom = n,
                p.exportMode = this.options.appearance.htmlRenderMode,
                p.exportQuality = S.High,
                p.exportBookmarksMode = y.ReportOnly,
                p.removeEmptySpaceAtBottom = !1,
                p.openLinksTarget = a,
                p.useWatermarkMargins = !0,
                this.options.appearance.chartRenderType) {
                case t.StiChartRenderType.AnimatedVector:
                    p.chartType = i.AnimatedVector;
                    break;
                case t.StiChartRenderType.Vector:
                    p.chartType = i.Vector
                }
                var c = new l
                  , h = new g(c);
                r.exportTo(e, h, p);
                var v = c.getStringBuilder().toString()
                  , A = {};
                A.content = v;
                var E = e.renderedPages.getByIndex(o);
                if (!E)
                    return null;
                return A.margins = String.stiFormat("{0}px {1}px {2}px {3}px", Math.round(e.unit.convertToHInches(E.margins.top) * n), Math.round(e.unit.convertToHInches(E.margins.right) * n), Math.round(e.unit.convertToHInches(E.margins.bottom) * n), Math.round(e.unit.convertToHInches(E.margins.left) * n)),
                A.sizes = String.stiFormat("{0};{1}", Math.round(e.unit.convertToHInches(E.pageWidth) * n), Math.round(e.unit.convertToHInches(E.pageHeight) * n)),
                A.background = s.toHtml(f.toColor(E.brush)),
                A
            }
            ,
            P.prototype.getPagesArray = function(e, t, r) {
                if (null == e)
                    return [];
                var o = new p;
                o.insertInteractionParameters = !0,
                o.renderAsDocument = this.options.appearance.htmlRenderMode != c.Table,
                o.styles = [],
                o.clearOnFinish = !1,
                o.renderStyles = !1,
                o.exportServiceId = this.viewerId;
                var i = String.empty
                  , n = String.empty
                  , a = String.empty
                  , s = String.empty
                  , m = [];
                if ("OnePage" == t.viewMode) {
                    var u = this.getReportPage(e, o, t.pageNumber, t.zoom / 100, t.openLinksTarget);
                    m.add(u)
                } else if ("WholeReport" == t.viewMode)
                    for (var d = 0; d < e.renderedPages.count; d++) {
                        var u = this.getReportPage(e, o, d, t.zoom / 100, t.openLinksTarget);
                        m.add(u)
                    }
                else if ("MultiPage" == t.viewMode) {
                    var S = t.multiPageWidthCount
                      , y = t.multiPageHeightCount;
                    null == S && (S = 1),
                    null == y && (y = 1);
                    for (var f = [], h = Math.min(t.pageNumber + S * y, t.pageNumber + e.renderedPages.count), d = 0; d < h; d++) {
                        var v = void 0;
                        null != f[f.length - 1] && f[f.length - 1].length < S ? v = f[f.length - 1] : (v = [],
                        f.add(v)),
                        v.add({
                            pageWidth: e.unit.convertToHInches(e.renderedPages.getByIndex(d).pageWidth),
                            pageHeight: e.unit.convertToHInches(e.renderedPages.getByIndex(d).pageHeight)
                        })
                    }
                    for (var A = 0, E = 0, w = 0, b = f; w < b.length; w++) {
                        for (var v = b[w], x = 0, T = 0, P = 0, R = v; P < R.length; P++) {
                            var I = R[P];
                            x += t.multiPageMargins,
                            x += I.pageWidth,
                            x += t.multiPageMargins,
                            T = Math.max(I.pageHeight, T)
                        }
                        A = Math.max(x, A),
                        E += t.multiPageMargins,
                        E += T,
                        E += t.multiPageMargins
                    }
                    var D = t.multiPageContainerWidth / A
                      , C = t.multiPageContainerHeight / E
                      , V = Math.trunc(100 * Math.min(D, C)) / 100 - .05;
                    null == V && (V = 1),
                    r.zoom = Math.round(100 * V);
                    for (var d = 0; d < e.renderedPages.count; d++) {
                        var u = this.getReportPage(e, o, d, V, t.openLinksTarget);
                        m.add(u)
                    }
                }
                var k = new l
                  , B = new g(k);
                o.htmlWriter = B,
                null != o.tableRender && o.tableRender.renderStylesTable2(!0, !1, !1, null);
                var F = k.getStringBuilder().toString();
                m.add(F);
                var M = o.getChartScript();
                return m.add(M),
                o.clear(),
                m
            }
            ,
            P.prototype.getReportFileName = function() {
                var e = null == this.report.reportAlias || 0 == this.report.reportAlias.trim().length ? this.report.reportName : this.report.reportAlias;
                return null != e && 0 != e.trim().length || (e = null != this.report.reportFile && this.report.reportFile.trim().length > 0 ? this.report.reportFile.replaceAll(".mrt", "").replaceAll(".mrz", "").replaceAll(".mrx", "").replaceAll(".mdc", "").replaceAll(".mdz", "").replaceAll(".mdx", "") : "Report"),
                e = e.replace(/\\/, "/"),
                e.substr(e.lastIndexOf("/") + 1)
            }
            ,
            P.prototype.showProcessIndicator = function() {
                this.jsObject && this.jsObject.controls.processImage.show()
            }
            ,
            P.prototype.hideProcessIndicator = function() {
                this.jsObject && this.jsObject.controls.processImage.hide()
            }
            ,
            P
        }();
        t.StiViewer = P
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
var Stimulsoft;
!function(e) {
    var t;
    !function(t) {
        var r = e.System.Drawing.Color
          , o = function() {
            function e() {
                this.appearance = new t.StiAppearanceOptions,
                this.toolbar = new t.StiToolbarOptions,
                this.exports = new t.StiExportsOptions,
                this.email = new t.StiEmailOptions,
                this.width = "100%",
                this.height = String.empty,
                this.viewerId = String.empty,
                this.requestStylesUrl = String.empty,
                this.productVersion = "2016.3",
                this.actions = {
                    exportReport: t.StiExportAction.ExportReport,
                    emailReport: t.StiExportAction.SendEmail
                }
            }
            return e.prototype.toParameters = function() {
                var e = {};
                return this.serializeObject(this, e),
                {
                    options: e
                }
            }
            ,
            e.prototype.serializeObject = function(o, i) {
                for (var n in o)
                    if ("object" == typeof o[n])
                        if (o[n].is(r)) {
                            var a = o[n];
                            a.isNamedColor ? i[n] = a.name : i[n] = String.stiFormat("#{0:X2}{1:X2}{2:X2}", a.r, a.g, a.b)
                        } else
                            i[n] = {},
                            this.serializeObject(o[n], i[n]);
                    else {
                        if (o.is(e) && ("width" == n || "height" == n))
                            continue;
                        i[n] = o[n],
                        o.is(t.StiAppearanceOptions) && ("pageAlignment" == n ? i[n] = t.StiContentAlignment[o[n]] : "interfaceType" == n ? i[n] = t.StiInterfaceType[o[n]] : "chartRenderType" == n ? i[n] = t.StiChartRenderType[o[n]] : "datePickerFirstDayOfWeek" == n && (i[n] = t.StiFirstDayOfWeek[o[n]])),
                        o.is(t.StiToolbarOptions) && ("alignment" == n ? i[n] = t.StiContentAlignment[o[n]] : "printDestination" == n ? i[n] = t.StiPrintDestination[o[n]] : "viewMode" == n ? i[n] = t.StiWebViewMode[o[n]] : "showMenuMode" == n && (i[n] = t.StiWebViewMode[o[n]]))
                    }
            }
            ,
            e
        }();
        t.StiViewerOptions = o
    }(t = e.Viewer || (e.Viewer = {}))
}(Stimulsoft || (Stimulsoft = {}));
;