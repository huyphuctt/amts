import Cookies from 'js-cookie';
import { isBoolean, isNumber, isObject, isString } from 'lodash';
import { toast } from "react-toastify";
import CONST from './Const';

const Utils = {
    /**
     * [getLocalStorage description]
    * @param  {[type]} key [description]
    * @return {[type]}     [description]
    */
    getLocalStorage(key) {
        var val = localStorage.getItem(key);
        if (val === undefined || val === null) {
            val = '';
        }
        return val;
    },

    /**
     * [setLocalStorage description]
     * @param {[type]} key   [description]
     * @param {[type]} value [description]
     */
    setLocalStorage(key, value) {
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem(key, value);
        } else {
            console.error('Sorry! No Web Storage support..');
        }
    },

    initFormSubmit(form, asyncFn) {
        if (form) {
            form.onsubmit = async (e) => {
                e.preventDefault();
                if (asyncFn) {
                    asyncFn();
                }
            };
        }
    },

    isNotNull(obj) {
        if (obj === undefined || obj === null) return false;
        return true;
    },

    isNullOrEmpty(obj, field) {
        if (!obj) return true;
        if (!Utils.isset(obj, field)) return true;
        var val = obj[field];
        if (typeof val.trim === 'function') {
            val = val.trim();
        }
        if (val.length === 0) return true;
        return false;
    },

    /***
     * check if field is set and have value
     */
    isset(obj, field) {
        if (!obj) return false;
        if (obj[field] == undefined) return false;
        return true;
        //return obj[field];
    },

    unset(obj, field) {
        if (Utils.isset(obj, field)) {
            delete obj[field];
        }
    },

    formFromForm(form) {
        const data = new FormData();
        if (form) {
            const form_data = new FormData(form);
            form_data.forEach(function (value, key) {
                data.append(key, value);
            });
        }
        data.append('token', Utils.getLocalStorage('token'));
        return data;
    },

    stringify(obj) {
        if (isString(obj)) {
            return obj;
        }
        if (isBoolean(obj)) {
            return obj;
        }
        if (isNumber(obj)) {
            return obj;
        }
        return new Blob([JSON.stringify(obj)], {
            type: 'application/json'
        });
    },

    /**
     * Performs a case-sensitive check indicating if haystack begins with needle.
     */
    str_starts_with(haystack, needle) {
        return haystack.startsWith(needle);
    },

    /**
     * Performs a case-sensitive check indicating if haystack ends with needle.
     */
    str_ends_with(haystack, needle) {
        return haystack.endsWith(needle);
    },

    formData(params) {
        const data = new FormData();
        if (params) {
            data.append('params', JSON.stringify(params));
        }
        data.append('token', Utils.getLocalStorage('token'));
        return data;
    },

    getTokens() {
        return {
            'token': Utils.getLocalStorage('token')
        }
    },

    getQuery(location) {
        //remove anchor    
        try {
            var queries = location.href.split('#');
            if (queries.length > 0) {
                queries = queries[0].split('?');
            }

            var params = null;
            var page = '';
            if (queries.length > 0) {
                var paths = queries[0].split("/");
                if (paths.length > 0) {
                    page = paths[paths.length - 1];
                }
            }
            if (queries.length > 1) {

                params = new URLSearchParams(queries[1]);
            } else {
                params = new URLSearchParams();
            }

            return {
                page: page,
                hash: location.hash,
                params: params
            };
        } catch (ex) {
            return null;
        }
    },

    getSavedObject(key, expired = 0) {
        var value = Utils.getLocalStorage(key);
        if (value) {
            try {
                var obj = JSON.parse(value);
                var now = Date.now() / 1000;//seconds
                if (expired > 0 && Utils.isset(obj, 'valid_from')) {
                    var valid_from = obj.valid_from;
                    var ttl = now - valid_from;
                    if (expired > ttl) {
                        return obj.value;
                    }
                    return null;
                }
                return obj;
            } catch (error) {
            }
        }

        return null;
    },

    setCookie(name, value, exp = 30) {
        Cookies.set(name, value, { expires: exp });
    },

    getCookie(name) {
        return Cookies.get(name);
    },

    log(msg) {
        console.log(msg);
    },

    number_format(number, decimals = 0, decPoint = ".", thousandsSep = ",") {
        number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
        const n = !isFinite(+number) ? 0 : +number
        const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
        const sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
        const dec = (typeof decPoint === 'undefined') ? '.' : decPoint
        let s = ''
        const toFixedFix = function (n, prec) {
            if (('' + n).indexOf('e') === -1) {
                return +(Math.round(n + 'e+' + prec) + 'e-' + prec)
            } else {
                const arr = ('' + n).split('e')
                let sig = ''
                if (+arr[1] + prec > 0) {
                    sig = '+'
                }
                return (+(Math.round(+arr[0] + 'e' + sig + (+arr[1] + prec)) + 'e-' + prec)).toFixed(prec)
            }
        }
        // @todo: for IE parseFloat(0.55).toFixed(0) = 0;
        s = (prec ? toFixedFix(n, prec).toString() : '' + Math.round(n)).split('.')
        if (s[0].length > 3) {
            s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
        }
        if ((s[1] || '').length < prec) {
            s[1] = s[1] || ''
            s[1] += new Array(prec - s[1].length + 1).join('0')
        }
        return s.join(dec)
    },

    intval(str, def = NaN) {
        if (Number.isInteger(str)) {
            return str;
        }
        if (str && typeof str.replace === 'function') {
            str = str.replace(/,/gi, '');
        }
        var val = parseInt(str);
        if (isNaN(val)) {
            return def;
        }

        return val;
    },

    floatval(str, def = NaN) {
        if (str && typeof str.replace === 'function') {
            str = str.replace(/,/gi, '');
        }
        var val = parseFloat(str);
        if (isNaN(val)) {
            return def;
        }
        return val;
    },

    compare(str1, str2) {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
        return str1 == str2;
    },

    /**
     * Determine if a string contains a given substring
     * - Performs a case-sensitive check indicating if needle is contained in haystack.
     * @return boolean true if needle is in haystack, false otherwise.
     */
    str_contains(haystack, needle) {
        return haystack.includes(needle);
    },

    /**
     * Split a string by a string
     * - Returns an array of strings, each of which is a substring of string formed by splitting it on boundaries formed by the string separator. 
     **/
    explode(separator, string) {
        return string.split(separator);
    },

    explodeIdx(separator, string, idx = 0) {
        var arr = Utils.explode(separator, string);
        var count = arr.length;
        if (count > 0) {
            if (idx === -1) {
                return arr[count - 1];
            } else if (idx < count) {
                return arr[idx];
            }
        }
        return '';
    },

    debuggerBreak() {
        debugger;
    },

    executeOnceTimer: null,
    executeOnce(fn, delay) {
        if (Utils.executeOnceTimer != null) {
            clearInterval(Utils.executeOnceTimer);
        }
        Utils.executeOnceTimer = setInterval(function () {
            clearInterval(Utils.executeOnceTimer);
            Utils.executeOnceTimer = null;
            fn();
        }, delay);
    },

    textChangeTimer: null,
    onTextChange(el, fn) {
        if (Utils.textChangeTimer != null) {
            clearInterval(Utils.textChangeTimer);
        }
        Utils.textChangeTimer = setInterval(function () {
            clearInterval(Utils.textChangeTimer);
            Utils.textChangeTimer = null;
            if (fn) {
                fn(el);
            }
        }, 600);
    },
    buildUri(query, encode = true) {
        var uri = query.page;
        if (query.params.has('ref')) {
            uri += '?ref=' + query.params.get('ref');
        }
        if (encode) {
            return encodeURIComponent(uri);
        }
        return uri;
    },
    cloneObject(obj) {
        var str = JSON.stringify(obj);
        return JSON.parse(str);
    },
    emailValidation(email) {
        const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || regex.test(email) === false) {
            return false;
        }
        return true;
    },
    // str_replace(
    //     array|string $search,
    //     array|string $replace,
    //     string|array $subject,
    //     int &$count = null
    // ): string|array
    str_replace(search, replace, subject) {
        var result = subject;
        result = result.replace(search, replace);
        return result;
    },
    removeAt(arr, idx) {
        if (idx >= 0 && idx < arr.length) {
            var removed = arr.splice(idx, 1);
            return removed;
        }
        return null;
    },
    removeItem(arr, item) {
        var idx = arr.indexOf(item);
        if (idx >= 0 && idx < arr.length) {
            var removed = arr.splice(idx, 1);
            return removed;
        }
        return null;
    },
    standardizeSheetData(sheetData) {
        if (sheetData.length > 0) {
            var headers = sheetData[0];
            if (Utils.isset(headers, '__EMPTY_1')) {
                var newSheetData = [];
                for (let index = 1; index < sheetData.length; index++) {
                    const row = sheetData[index];
                    var newRow = {};
                    for (const header in headers) {
                        var field = headers[header];
                        newRow[field] = row[header];
                    }
                    newSheetData.push(newRow);
                }
                return newSheetData;
            }
        }
        return sheetData;
    },
    item2Option(item) {
        if (item) {
            if (Utils.isset(item, 'value') && Utils.isset(item, 'label')) {
                return item;
            }
            var option = {};
            if (Utils.isset(item, 'name')) {
                option.value = item.name;
                option.label = item.name;
            }
            if (Utils.isset(item, 'code')) {
                option.code = item.code;
            }
            if (Utils.isset(item, 'id')) {
                option.id = item.id;
            }
            return option;
        }
        return null;
    },
    showToast(msg, type = CONST._ERR_INFO_, position = toast.POSITION.BOTTOM_CENTER, hideDuration = 3000) {
        toast(msg, {
            position: position,
            // type: type
        });
    },
    showLoading() {
    },
    hideLoading() {
    }
}
export default Utils;