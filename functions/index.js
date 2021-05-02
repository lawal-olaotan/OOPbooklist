/**
 * Get the Translated phrase or word of the passed language
 * @param _ the word to lookup to
 * @param lang the language to look into
 * This helps in translating the page
 */

exports.renderImplimental = (params, no_join) => {
    
    let p_explit = params.split('[>').join('<div class="art_render_implimental"><h6 class="art_bullet">').split('[_>>').join('</h6><div class="art_bullet_element">').split(']').join('</div></div>')
    let explitedWprds = []
    p_explit.split(' ').map(word => {
        let othe_word = word.substr(word.indexOf('`_') + 1, word.indexOf('_`'))
            // console.log(othe_word);
        if (word.match(othe_word)) {
            othe_word = '`' + othe_word + '`';
            let _w;
            if (no_join === true) {
                _w = word.split(othe_word).join('' + this.language(othe_word.replace('`_', '').replace('_`', '')) + '')
            } else {
                _w = word.split(othe_word).join('<b>' + this.language(othe_word.replace('`_', '').replace('_`', '')) + '</b>')
            }
            explitedWprds.push(_w)
        }
    });

    return explitedWprds.join(' ').split('`').join('')

}

exports.initialElements = ["assets/css/style.min.css","//cdn.jsdelivr.net/npm/axios/dist/axios.min.js","https://use.fontawesome.com/releases/v5.15.3/css/all.css", "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&display=swap","https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js","https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js",
];

exports.meta = (data, req) => {
    // let lang = this.getAppCookies(req)['language'];
    let { title, keywords, description, preview_image, theme_color } = data;

    /* description = description === "" ? this.language("@company_short_description", lang) : description || this.language("@company_short_description", lang);
    preview_image = preview_image === "" ? this.pathToTheRoot(req._parsedUrl.path) + this.language("@company_default_preview_image", lang) : this.pathToTheRoot(req._parsedUrl.path) + preview_image || this.pathToTheRoot(req._parsedUrl.path) + this.language("@company_default_preview_image", lang); */

    let meta = [{
            name: "title",
            content: title,
        },
        {
            name: "keywords",
            content: keywords,
        },
        {
            name: "description",
            content: description,
        }, {
            name: "apple-mobile-web-app-status-bar-style",
            content: `default`,
        },
        {
            name: "theme-color",
            content: theme_color || `#fff`,
        },
        {
            property: "og:type",
            content: "website",
        },
        {
            property: "og:url",
            content: `${req.headers.host}`,
        },
        {
            property: "og:title",
            content: title,
        },
        {
            property: "og:description",
            content: description,
        },
        {
            property: "og:image",
            content: preview_image || '',
        },
        {
            property: "twiter:card",
            content: `summery_large_image`,
        },
        {
            property: "twiter:url",
            content: `${req.headers.host}`,
        },
        {
            property: "twiter:title",
            content: title,
        },
        {
            property: "twiter:description",
            content: description,
        },
        {
            property: "twiter:image",
            content: preview_image || '',
        }
    ];

    return meta;
}

let appendLangMainTimer;
let appendLangTimer;
exports.language = (_, lang) => {

    clearTimeout(appendLangMainTimer);
    clearTimeout(appendLangTimer);

    lang = lang || 'en'
    const styfy = d => {
        let _d = d.trim();
        _d = _d.split('\\').join('\\\\').split(' ').join('_').toLowerCase();


        d = d.split('_').join(' ');

        let _data = {};
        _data[_d] = d;
        return _data;
    }

    let _res = require('../language/' + lang + '.json');


    let arryRes = _res[0] || _res;
    let data = arryRes[_];

    appendLangMainTimer = setTimeout(this.appendLangMain, 7000, arryRes, lang);

    if (typeof data !== "undefined" && (data !== null && data.trim() !== '')) {

        return data;
    } else {
        data = arryRes[Object.keys(styfy(_))[0]];

        if (typeof data !== "undefined" && (data !== null && data.trim() !== '')) {
            return arryRes[Object.keys(styfy(_))[0]]
        }

        appendLangTimer = setTimeout(() => {
            Object.assign(arryRes, styfy(_));
            this.appendLang(lang, arryRes);
            return arryRes[Object.keys(styfy(_))[0]]
        }, 7000, arryRes, styfy, lang);

    }
    return _.split('_').join(' ');
};


// exports.appendLang = (lang, arryRes) => {
//     let prepend = require('../language/' + lang + '.json');

//     if (typeof arryRes === "object") {
//         if (Object.keys(arryRes)) {
//             arryRes = {...prepend, ...arryRes };
//             require('fs').writeFileSync('language/' + lang + '.json', JSON.stringify(arryRes, null, 4), 'utf8', (_err) => {

//                 if (_err) {
//                     console.log(`Error writing file: ${err}`);
//                 } else {
//                     console.log(`File is written successfully!`);
//                 }

//             });

//             this.appendLangMain(arryRes, lang)
//         }

//     } else {
//         console.log(typeof arryRes);
//     }

// };

// exports.appendLangMain = (arryRes, lang) => {
//         let data = require('../language/' + 'main' + '.json');
//         data = data || {};
//         data[lang] = arryRes;
//         data = {...data };
//         require('fs').writeFileSync('language/' + 'main' + '.json', JSON.stringify(data, null, 4), 'utf8', (err => {
//             if (err) console.log(err);
//         }))

//     }
//     /**
//      * @param res the http response
//      * @param name the name of the cookie to be sent to the client
//      * @param value the value to the cookie name to be sent to the client
//      * 
//      * This helps in setting/sending the language cookie to the client
//      */
// exports.setLangCookie = (req, res, next) => {
//     // Set Our Language token
//     this.setCookie(res, {
//         name: 'language',
//         value: this.getAppCookies(req)['language'] || 'en',
//         exp: false,
//     })
//     if (next)
//         next()
// };
/**
 * @param res the http response  
 * @param name the name of the cookie to be sent to the client
 * @param value the value to the cookie name to be sent to the client
 * @param exp the boolean to assure if the cookie will expire
 * @param days the number of days of when the cookie expires default is 1 day
 * This helps in setting/sending the cookies to the client
 */
// exports.setCookie = (res, data) => {
//     let { name, value, exp, days } = data;

//     // Our token expiry time
//     if (exp) {
//         days = days || 1;
//         const dayToSeconds = (24 * 60 * 60) * days;
//         let maxAge = dayToSeconds;
//         res.cookie(name, value, {
//             maxAge,
//             // You can't access these tokens in the client's javascript
//             httpOnly: true,
//             // Forces to use https in production
//             secure: process.env.NODE_ENV === 'production' ? true : false
//         });
//         return 0;
//     }

//     res.cookie(name, value, {
//         // You can't access these tokens in the client's javascript
//         httpOnly: true,
//         // Forces to use https in production
//         secure: process.env.NODE_ENV === 'production' ? true : false
//     });

// };
/**
 * 
 * @param req the http request
 * This helps in getting the request cookies from the client
 * returns an object with the cookies' name as keys
 */

exports.getAppCookies = (req) => {
    // We extract the raw cookies from the request headers
    const rawCookies = req.headers.cookie.split('; ');
    // rawCookies = ['myapp=secretcookie, 'analytics_cookie=beacon;']

    const parsedCookies = {};
    rawCookies.forEach(rawCookie => {
        const parsedCookie = rawCookie.split('=');
        // parsedCookie = ['myapp', 'secretcookie'], ['analytics_cookie', 'beacon']
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });
    return parsedCookies;
};
/**
 * Get the real path to the root
 * @param {*} path This a request path [req._parsedUrl.path]
 * This helps to go to statics on front-end with easy.
 * Expample [path = '/this/is/a/pth/df/fdf/dsd/fdf/fdf] = hard to read and replacing it with ../../etc is hard
 * So better path the rootPath to pathToTheRoot so we can get the ../../etc for front-end
 * 
 * Returns String ./ or ../ or [etc]
 */

exports.pathToTheRoot = (path) => {
    let rootPath = path,
        rPath = ['./'];

    if (rootPath.match(/\/\w/ig)) {
        // rPath = [];
        rootPath.match(/\/\w/ig).map(p => rPath.push(".." + p.match(/\//ig)[0]));
    }

    return rPath.join(""); //return the real path [now this is like ../../etc]
};

exports.useLocals = (req, res, next) => {
    // res.locals.logged_in = typeof req.isAuthenticated !== "undefined" ? req.isAuthenticated() : false;
    req.app.set('logged_in', typeof req.isAuthenticated !== "undefined" ? req.isAuthenticated() : false)
    next();
    // console.log(req);
}
// exports._language = (req, res, next) => {
//     let language = this.getAppCookies(req)['language'];
//     if (next) {


//         req.app.set('language', language)

//         return next()
//     }
// };
exports.conn = function(cb) {
    const connection = require('mysql').createConnection(require('./dbHelper').dbconnection);
    connection.connect((err, con) => {
        // if (err) console.log(err);
    });

    connection.on('connect', () => {

        console.log("✔️  Alt Connection starting")
        if (typeof cb === "function") {
            cb(connection)
        }
    })
    connection.on('end', err => {
        if (err.code === "ECONNREFUSED") {
            console.log(err.message)
            console.error(require('../config').DBERROR)
            if (typeof cb === "function") {
                cb()
            }
            return
        }
        console.log(err)
        if (typeof cb === "function") {
            cb()
        }
    })
    connection.on('error', err => console.log(err))

    if (typeof cb === "function") {
        cb(connection)
    }
    return connection;
};
exports.con = function(db, cb) {
    const connection = require('mysql').createConnection(require('./dbHelper').con(db));
    connection.connect((err, con) => {
        // if (err) console.log(err);
    });

    connection.on('connect', () => {

        console.log("DB Connection starting✔️")
        if (typeof cb === "function") {
            cb(connection)
        }
    })
    connection.on('end', err => {
        if (err.code === "ECONNREFUSED") {
            console.log(err.message)
            console.error(require('../config').DBERROR)
            if (typeof cb === "function") {
                cb()
            }
            return
        }
        console.log(err)
        if (typeof cb === "function") {
            cb()
        }
    })
    connection.on('error', err => console.log(err))

    if (typeof cb === "function") {
        cb(connection)
    }
    return connection;
};

exports.destroy = function() {
    return require('mysql').createConnection(require('./dbHelper').dbconnection).destroy()
};
exports.end = function() {
    return require('mysql').createConnection(require('./dbHelper').dbconnection).end()
};
exports.extractModelColumns = function(model) {

    const model_name = Object.keys(model)[0],
        model_columns = Object.keys(model[model_name]);

    let dt = '';
    for (let model_column of model_columns) {
        dt += `${model_column} `;
        const { AUTO_INCREMENT, TYPE, DEFAULT } = model[model_name][model_column];
        if (AUTO_INCREMENT === true) {
            dt += `${TYPE} AUTO_INCREMENT`
            if (DEFAULT !== '') {
                dt += ` DEFAULT $DEFAULT}, `
            } else {
                dt += ', '
            }
            dt += 'PRIMARY KEY (`' + model_column + '`), '
        } else {
            dt += `${TYPE}, `
        }
    }

    this.table_name = model_name;

    return dt.trim().substr(0, dt.lastIndexOf(','))
};

exports.insertInitialDBData = function(conn, model) {
    conn.query(require('./dbHelper').createTable(require('../models/' + model.name)), (err, res) => {
        if (err) throw err;

        if (model.hasInitialData === true) {
            model.m_name = model.name + 's';

            conn.query(require('./dbHelper').selector(model.m_name, '*'), (err, res) => {
                if (err) throw err;

                if (!res.length) {
                    for (const branche of require('../models/data/' + model.m_name)[model.m_name]) {
                        let data = { columns: [], values: [] };
                        for (let keys of Object.keys(branche)) {
                            data.columns.push(`${keys}`);
                            data.values.push(`'${branche[keys]}'`);
                        }
                        conn.query(require('./dbHelper').insertData(model.m_name, data.columns, data.values), (err, res) => {
                            if (err) throw err;
                        });
                    }
                }
            });
        }
    });
};

exports.c_client = _ => {
    let contentful = require('contentful')
    let config = require('../config/config').contentFull || {};

    const client = contentful.createClient({
        accessToken: config.accessToken,
        space: config.space
    });
    return client;
};

exports.getFullCont = {
    getCategory: (id, query) => {
        query = query || {}
        query['content_type'] = 'categories'
        query['sys.id'] = id
        return this.c_client().getEntries(query)
    },
    getCategories: (query) => {
        query = query || {}
        query['content_type'] = 'categories';
        return this.c_client().getEntries(query)
    },
    getProduct: (id, query) => {
        query = query || {}
        query['content_type'] = 'products';
        query['sys.id'] = id
        return this.c_client().getEntries(query)
    },
    getProducts: (query) => {
        query = query || {}
        query['content_type'] = 'products';
        return this.c_client().getEntries(query)
    },
    getStatus: (query) => {
        query = query || {}
        query['content_type'] = 'status';
        return this.c_client().getEntries(query)
    },
    getAddress: (query) => {
        query = query || {}
        query['content_type'] = 'address';
        return this.c_client().getEntries(query)
    },
    getPages: (query) => {
        query = query || {}
        query['content_type'] = 'pages';
        return this.c_client().getEntries(query)
    },
    getService: (query) => {
        query = query || {}
        query['content_type'] = 'services';
        return this.c_client().getEntries(query)
    },
    getRunningProgram: (query) => {
        query = query || {}
        query['content_type'] = 'programs';
        query['fields.active'] = true;
        query['limit'] = 1;
        query['order'] = 'sys.createdAt';
        return this.c_client().getEntries(query)
    }
};

exports.sendEmail = (messageTemp, Subject, to, from, name, template, attach, params, context) => {
    const mail = require('../mail/index'),
        keys = require('../config/keys').mail;

    // We can also send another email as a reminder
    const art_mail = new mail(require('nodemailer'), keys.user, keys.pass, template); //Authenticate SMTP
    // Send an email
    const message = messageTemp;
    return art_mail.send(Subject, message, to, from, name, attach, params, context)


};

exports.flutterWave = () => {
    const Flutterwave = require('flutterwave-node-v3');

    const flw = new Flutterwave(require('../config/keys').flutterWave.PUBLIC_KEY, require('../config/keys').flutterWave.SECRET_KEY);


    return {


        chargeCard: async(payload_data) => {
            const { v4: uuidv4 } = require('uuid');
            let transRef = uuidv4();
            // "card_number": "5531886652142950",
            //     "cvv": "564",
            //     "expiry_month": "09",
            //     "expiry_year": "21",
            //     "currency": "NGN",
            //     "amount": "100",
            //     "fullname": "Olufemi Obafunmiso",
            //     "email": "olufemi@flw.com",
            //     "phone_number": "0902620185",
            payload_data = JSON.stringify(payload_data);
            const payload = {
                payload_data,
                "enckey": "611d0eda25a3c931863d92c4",
                "redirect_url": "verify/card",
                "tx_ref": "TG-" + transRef // This is a unique reference, unique to the particular transaction being carried out. It is generated when it is not provided by the merchant for every transaction.

            };
            try {
                const response = await flw.Charge.card(payload)
                console.log(response)
                if (response.meta.authorization.mode === 'pin') {
                    let payload2 = payload
                    payload2.authorization = {
                        "mode": "pin",
                        "fields": [
                            "pin"
                        ],
                        "pin": 3310
                    }
                    const reCallCharge = await flw.Charge.card(payload2)

                    const callValidate = await flw.Charge.validate({
                        "otp": "12345",
                        "flw_ref": reCallCharge.data.flw_ref
                    })
                    console.log(callValidate)

                }
                if (response.meta.authorization.mode === 'redirect') {

                    var url = response.meta.authorization.redirect
                    open(url)
                }

                console.log(response)


            } catch (error) {
                console.log(error)
            }
        }
    }

}