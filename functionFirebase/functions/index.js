//firebase deploy --only functions


// If anybody else is continuing to receive this issue _after_ doing the updates, make sure that `"ecmaVersion": 8` is set in your .eslintrc.json as well.

// Grab the current value of what was written to the Realtime Database.
//const summa = event.data.val();
//   const nameDocument = event.params.nameDocument;
//   const idDocument = event.params.idDocument;

//   console.log(nameDocument);
//   console.log(idDocument);

// console.log('number');

// console.log(change.after.ref.child('number'));

// console.log('numberDoc');

// console.log(change.after.ref.child('numberDoc'))


// 
//export GOOGLE_APPLICATION_CREDENTIALS="/home/user/Documents/AngularProjects/ceruxtest-key.json"// 

'use strict';

// var parseString = require('xml2js').parseString;
// const cors = require('cors')({ origin: true });


const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


const firestore = admin.firestore();


exports.setNumberDocumentFV = functions.firestore
    .document('documents_fv/{id_doc}')
    .onCreate((snap, context) => {

        if (context.params.id_doc === 'numerators') {
            return null;
        }

        console.log(context.params.id_doc)

        console.log("BEGIN FV 1");

        const newValue = snap.data();

        console.log(newValue);


        // const dateDoc = newValue.dateDocument.toDate();

        const dateDoc = new Date(newValue.dateDocument);

        const mounth = dateDoc.getMonth() + 1
        const year = dateDoc.getFullYear()


        console.log("year")
        console.log(year)


        console.log("mounth")
        console.log(mounth)

        const numeratorCountRef = firestore.collection('numerators').doc('fv')
        const documentRef = firestore.collection('documents_fv').doc(context.params.id_doc)

        return firestore.runTransaction(transaction => {


            return transaction.get(numeratorCountRef).then(snapshot => {

                var numerators = snapshot.data()



                if (numerators === undefined) {
                    numerators = { numeratorYear: { [year]: { numeratorMounth: { [mounth]: { numerator: 0 } }, numerator: 0 } }, numerator: 0 }

                    // numerators = ['numeratorYear'][year]['numeratorMounth'][mounth]['numerator'] = 0

                    console.log("numerators NEW")
                    console.log(numerators)

                }

                console.log("BEGIN FV 2");


                var numer = 0;
                

                if (numerators.numeratorYear[year] === undefined) {
                    numerators.numeratorYear[year] = { numeratorMounth: { [mounth]: { numerator: 0 } }, numerator: 0 } 
                }

                if (numerators.numeratorYear[year].numeratorMounth[mounth] === undefined) {
                    numerators.numeratorYear[year].numeratorMounth[mounth] =  { numerator: 0 } 
                }

               
                numer = numerators.numeratorYear[year].numeratorMounth[mounth].numerator;
              

                numer = numer + 1;

                numerators.numeratorYear[year]['numeratorMounth'][mounth].numerator = numer;


                newValue.number = numer;
                newValue.numberDoc = "FV/" + numer + "/" + mounth + "/" + year;

                // newValue.timestampServer  = firestore.ServerValue.TIMESTAMP;

                //numeratorCountRef.set(numerators)

                transaction.set(numeratorCountRef, numerators);

                documentRef.set(newValue)

                return numerators;



            }).catch(error => {
                console.log("error")
                console.log(error)
            })
        })
    });


exports.setNumberDocumentPZ = functions.firestore
    .document('documents_pz/{id_doc}')
    .onCreate((snap, context) => {


        if (context.params.id_doc === 'numerators') {
            return null;
        }

        console.log("BEGIN PZ 1");

        const newValue = snap.data();

        console.log(newValue);


        // const dateDoc = newValue.dateDocument.toDate();

        const dateDoc = new Date(newValue.dateDocument);

        const mounth = dateDoc.getMonth() + 1
        const year = dateDoc.getFullYear()


        console.log("year")
        console.log(year)


        console.log("mounth")
        console.log(mounth)


        //const numeratorCountRef = parentRef.doc('numerators') ///' + year + '/' + mounth + '/numeratorCount

        const numeratorCountRef = firestore.collection('numerators').doc('pz')
        const documentRef = firestore.collection('documents_pz').doc(context.params.id_doc)


        return firestore.runTransaction(transaction => {


            return transaction.get(numeratorCountRef).then(snapshot => {

                var numerators = snapshot.data()



                if (numerators === undefined) {
                    numerators = { numeratorYear: { [year]: { numeratorMounth: { [mounth]: { numerator: 0 } }, numerator: 0 } }, numerator: 0 }

                    // numerators = ['numeratorYear'][year]['numeratorMounth'][mounth]['numerator'] = 0

                    console.log("numerators NEW")
                    console.log(numerators)

                }

                console.log("BEGIN PZ 2");


                var numer = 0;
                

                if (numerators.numeratorYear[year] === undefined) {
                    numerators.numeratorYear[year] = { numeratorMounth: { [mounth]: { numerator: 0 } }, numerator: 0 } 
                }

                if (numerators.numeratorYear[year].numeratorMounth[mounth] === undefined) {
                    numerators.numeratorYear[year].numeratorMounth[mounth] =  { numerator: 0 } 
                }

               
                numer = numerators.numeratorYear[year].numeratorMounth[mounth].numerator;
              

                numer = numer + 1;

                numerators.numeratorYear[year]['numeratorMounth'][mounth].numerator = numer;


                newValue.number = numer;
                newValue.numberDoc = "PZ/" + numer + "/" + mounth + "/" + year;

                // newValue.timestampServer  = firestore.ServerValue.TIMESTAMP;

                //numeratorCountRef.set(numerators)

                transaction.set(numeratorCountRef, numerators);

                documentRef.set(newValue)

                return numerators;



            }).catch(error => {
                console.log("error")
                console.log(error)
            })
        })
    });



exports.setNumberDocuments = functions.database.ref('/documents/{nameDocument}/{idDocument}').onWrite(
    (change, context) => {

        console.log("BEGIN");
        console.log(context.params.idDocument)

        if (context.params.idDocument === "numerators") {
            console.log("IT IS change.numeratorCount");
            return null;
        }




        //  IT IS REMOVE
        if (change.after === null) {
            console.log(" IT IS REMOVE");
            return null;
        }


        console.log(change.before)

        // IT IS EDIT
        if (change.before._data !== null) {
            console.log(" IT IS EDIT");
            return null;
        }

        console.log(change.after._data);

        if (!change.before.exists()) {

            console.log("------ START EXECUTION -----------");


            // console.log(change);
            // console.log(context);

            const dateDoc = new Date(change.after._data.dateDocument);

            const mounth = dateDoc.getMonth() + 1
            const year = dateDoc.getFullYear()


            const parentRef = change.after.ref.parent;
            const numeratorCountRef = parentRef.child('numerators/' + year + '/' + mounth + '/numeratorCount');




            // console.log(dateDoc)

            // admin.database.ServerValue.TIMESTAMP



            let typeNumerator = 3

            numeratorCountRef.transaction((current) => {

                let countNumber = (current || 0) + 1;


                let nextNumber = context.params.nameDocument.toUpperCase() + '/' + countNumber;


                switch (typeNumerator) {
                    case 2: nextNumber += '/' + year; break;
                    case 3: nextNumber += '/' + mounth + '/' + year; break;
                }


                change.after.ref.child('numberDoc').set(nextNumber);
                change.after.ref.child('number').set(countNumber);

                change.after.ref.child('timestampServer').set(admin.database.ServerValue.TIMESTAMP);


                console.log("------ END EXECUTION -----------");

                return countNumber;
            });
        }

        return null;
    });















// function getDaneSzukajFromXML(xml, res) {
//     parseString(xml, function (err, result) {
//         if (!err) {

//             var arrRes = result.root.dane[0];

//             var resultJSON = {
//                 Regon: arrRes.Regon[0],
//                 name: arrRes.name[0],
//                 Wojewodztwo: arrRes.Wojewodztwo[0],
//                 Powiat: arrRes.Powiat[0],
//                 Miejscowosc: arrRes.Miejscowosc[0],
//                 KodPocztowy: arrRes.KodPocztowy[0],
//                 Ulica: arrRes.Ulica[0],
//                 Typ: arrRes.Typ[0],
//                 SilosID: arrRes.SilosID[0],
//                 RegonLink: arrRes.RegonLink[0]
//             }

//             res(resultJSON, err);
//         } else {
//             res('', err)
//         }
//     });
// }

// function getDanePobierzPelnyRaportFromXML(xml, customer, res) {
//     parseString(xml, function (err, result) {
//         if (!err) {

//             //praw
//             var arrRes = result.root.dane[0];

//             prefix = 'fiz'
//             if (customer.Typ === "P" || customer.Typ === "LP") {
//                 prefix = 'praw'
//             }


//             ulica = arrRes[prefix + '_adSiedzUlica_name'][0];

//             house = adSiedzNumerNieruchomosci = arrRes[prefix + '_adSiedzNumerNieruchomosci'][0];
//             flat = adSiedzNumerLokalu = arrRes[prefix + '_adSiedzNumerLokalu'][0];

//             ulica = ulica + ' ' + house;

//             if (flat !== '') {
//                 ulica = ulica + '/' + flat;
//             }


//             var resultJSON = {

//                 NIP: customer.nip_my,

//                 name: arrRes[prefix + '_name'][0],
//                 telefon1: arrRes[prefix + '_numerTelefonu'][0],
//                 telefon2: arrRes[prefix + '_numerWewnetrznyTelefonu'][0],
//                 fax: arrRes[prefix + '_numerFaksu'][0],
//                 adresEmail: arrRes[prefix + '_adresEmail'][0],
//                 emailFaktury: arrRes[prefix + '_adresEmail'][0],
//                 www: arrRes[prefix + '_adresStronyinternetowej'][0],


//                 identyfikator: "",
//                 prefiksUE: "PL",

//                 dostawca: false,
//                 odbiorca: false,
//                 kontrahentJestOsobaFizyczna: false,
//                 zgodaNaOtrzymywanieEFaktur: false,
//                 zgodaNaPrzetwarzanieWCelachMarketingowych: false,
//                 numberKonta: "",
//                 nameBanku: "",

//                 adres: {

//                     ulicaNumer: ulica,
//                     adresZagraniczny: false,
//                     kodPocztowy: arrRes[prefix + '_adSiedzKodPocztowy'][0],
//                     miejscowosc: arrRes[prefix + '_adSiedzMiejscowosc_name'][0],
//                     kraj: arrRes[prefix + '_adSiedzKraj_name'][0],
//                 },

//                 adresKorespondencyjny: {
//                     ulicaNumer: "",
//                     adresZagraniczny: false,
//                     kodPocztowy: "",
//                     miejscowosc: "",
//                     kraj: ""
//                 },

//                 adresDelivery: {
//                     ulicaNumer: "",
//                     adresZagraniczny: false,
//                     kodPocztowy: "",
//                     miejscowosc: "",
//                     kraj: ""
//                 },

//                 wysylajFakturyNaObaAdresyEmail: false,
//                 uwagi: ""


//                 // praw_regon14 : arrRes.praw_regon14[0],
//                 // praw_nip : arrRes.praw_nip[0],
//                 // praw_nameSkrocona : arrRes.praw_name[0],
//                 // praw_numerWrejestrzeEwidencji : arrRes.praw_numerWrejestrzeEwidencji[0],
//                 // praw_dataPowstania : arrRes.praw_dataPowstania[0],
//                 // praw_dataRozpoczeciaDzialalnosci : arrRes.praw_dataRozpoczeciaDzialalnosci[0],
//                 // praw_dataWpisuDoREGON : arrRes.praw_dataWpisuDoREGON[0],
//                 // praw_dataZawieszeniaDzialalnosci : arrRes.praw_dataZawieszeniaDzialalnosci[0],
//                 // praw_dataWznowieniaDzialalnosci : arrRes.praw_dataWznowieniaDzialalnosci[0],
//                 // praw_dataZaistnieniaZmiany : arrRes.praw_dataZaistnieniaZmiany[0],
//                 // praw_dataZakonczeniaDzialalnosci    : arrRes.praw_dataZakonczeniaDzialalnosci[0],
//                 // praw_dataSkresleniazRegon           : arrRes.praw_dataSkresleniazRegon[0],
//                 // praw_adSiedzKraj_Symbol             : arrRes.praw_dataZakonczeniaDzialalnosci[0],
//                 // praw_adSiedzWojewodztwo_Symbol      : arrRes.praw_adSiedzWojewodztwo_Symbol[0],
//                 // praw_adSiedzPowiat_Symbol           : arrRes.praw_adSiedzPowiat_Symbol[0],
//                 // praw_adSiedzGmina_Symbol            : arrRes.praw_adSiedzGmina_Symbol[0],
//                 // praw_adSiedzMiejscowoscPoczty_Symbol  : arrRes.praw_adSiedzMiejscowoscPoczty_Symbol[0],               
//                 // praw_adSiedzMiejscowosc_Symbol             : arrRes.praw_adSiedzMiejscowosc_Symbol[0],
//                 // praw_adSiedzUlica_Symbol             : arrRes.praw_adSiedzUlica_Symbol[0],
//                 // praw_adSiedzNietypoweMiejsceLokalizacji             : arrRes.praw_adSiedzNietypoweMiejsceLokalizacji[0],
//                 // praw_adresEmail2             : arrRes.praw_adresEmail2[0],
//                 // praw_adKorKraj_Symbol             : arrRes.praw_adKorKraj_Symbol[0],
//                 // praw_adKorWojewodztwo_Symbol        : arrRes.praw_adKorWojewodztwo_Symbol[0],
//                 // praw_adKorPowiat_Symbol             : arrRes.praw_adKorPowiat_Symbol[0],
//                 // praw_adKorGmina_Symbol             : arrRes.praw_adKorGmina_Symbol[0],
//                 // praw_adKorKodPocztowy             : arrRes.praw_adKorKodPocztowy[0],
//                 // praw_adKorMiejscowosciPoczty_Symbol      : arrRes.praw_adKorMiejscowosciPoczty_Symbol[0],
//                 // praw_adKorMiejscowosc_Symbol             : arrRes.praw_adKorMiejscowosc_Symbol[0],
//                 // praw_adKorUlica_Symbol                   : arrRes.praw_adKorUlica_Symbol[0],
//                 // praw_adKorNumerNieruchomosci             : arrRes.praw_adKorNumerNieruchomosci[0],
//                 // praw_adKorNumerLokalu                    : arrRes.praw_adKorNumerLokalu[0],
//                 // praw_adKorNietypoweMiejsceLokalizacji    : arrRes.praw_adKorNietypoweMiejsceLokalizacji[0],
//                 // praw_adKornamePodmiotuDoKorespondencji  : arrRes.praw_adKornamePodmiotuDoKorespondencji[0],
//                 // praw_adSiedzWojewodztwo_name  : arrRes.praw_adSiedzWojewodztwo_name[0],
//                 // praw_adSiedzPowiat_name  : arrRes.praw_adSiedzPowiat_name[0],
//                 // praw_adSiedzGmina_name  : arrRes.praw_adSiedzGmina_name[0],
//                 // praw_adSiedzMiejscowoscPoczty_name  : arrRes.praw_adSiedzMiejscowoscPoczty_name[0],
//                 // praw_adKorKraj_name  : arrRes.praw_adKorKraj_name[0], 
//                 // praw_adKorWojewodztwo_name  : arrRes.praw_adKorWojewodztwo_name[0],
//                 // praw_adKorPowiat_name  : arrRes.praw_adKorPowiat_name[0],
//                 // praw_adKorGmina_name  : arrRes.praw_adKorGmina_name[0],
//                 // praw_adKorMiejscowosc_name  : arrRes.praw_adKorMiejscowosc_name[0],
//                 // praw_adKorMiejscowoscPoczty_name  : arrRes.praw_adKorMiejscowoscPoczty_name[0],
//                 // praw_adKorUlica_name  : arrRes.praw_adKorUlica_name[0],
//                 // praw_podstawowaFormaPrawna_Symbol  : arrRes.praw_podstawowaFormaPrawna_Symbol[0],
//                 // praw_szczegolnaFormaPrawna_Symbol  : arrRes.praw_szczegolnaFormaPrawna_Symbol[0],
//                 // praw_formaFinansowania_Symbol  : arrRes.praw_formaFinansowania_Symbol[0],  
//                 // praw_formaWlasnosci_Symbol  : arrRes.praw_formaWlasnosci_Symbol[0],
//                 // praw_organZalozycielski_Symbol  : arrRes.praw_organZalozycielski_Symbol[0],
//                 // praw_organRejestrowy_Symbol  : arrRes.praw_organRejestrowy_Symbol[0],
//                 // praw_rodzajRejestruEwidencji_Symbol  : arrRes.praw_rodzajRejestruEwidencji_Symbol[0],
//                 // praw_podstawowaFormaPrawna_name  : arrRes.praw_podstawowaFormaPrawna_name[0],
//                 // praw_szczegolnaFormaPrawna_name  : arrRes.praw_szczegolnaFormaPrawna_name[0],
//                 // praw_formaFinansowania_name  : arrRes.praw_formaFinansowania_name[0],
//                 // praw_formaWlasnosci_name  : arrRes.praw_formaWlasnosci_name[0],
//                 // praw_organZalozycielski_name  : arrRes.praw_organZalozycielski_name[0],
//                 // praw_organRejestrowy_name  : arrRes.praw_organRejestrowy_name[0],
//                 // praw_rodzajRejestruEwidencji_name  : arrRes.praw_rodzajRejestruEwidencji_name[0],
//                 // praw_jednostekLokalnych  : arrRes.praw_jednostekLokalnych[0],
//                 // praw_dataWpisuDoRejestruEwidencji  : arrRes.praw_dataWpisuDoRejestruEwidencji[0],

//             }

//             res(resultJSON, err);
//         } else {
//             res('', err)
//         }
//     });
// }

// function getResultFromXML(xml, param, res) {
//     parseString(xml, function (err, result) {
//         if (!err) {
//             res(result['s:Body'][param + 'Response'][0][param + 'Result'][0], err);
//         } else {
//             res('', err)
//         }
//     });
// }

// "DaneSzukajResult"

// function login(result) {



//     code = 'd0d2257f78a44a47a794'



//     var xml = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">' +
//         '<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">' +
//         '<wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>' +
//         '<wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj</wsa:Action>' +
//         '</soap:Header>' +
//         '<soap:Body>' +
//         '<ns:Zaloguj>' +
//         '<ns:pKluczUzytkownika>' + code + '</ns:pKluczUzytkownika>' +
//         '</ns:Zaloguj>' +
//         '</soap:Body>' +
//         '</soap:Envelope>'


//     var http = require('https');
//     var http_options = {
//         hostname: 'wyszukiwarkaregon.stat.gov.pl',
//         //url: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
//         //port: 443, 
//         path: '/wsBIR/UslugaBIRzewnPubl.svc',
//         method: 'POST',
//         //  body: xml,
//         Connection: 'Keep-Alive',
//         headers: {
//             'Connection': 'Keep-Alive',
//             //'Content-Type': 'application/soap+xml', 
//             'Content-Type': 'application/soap+xml;charset=UTF-8',
//             'action': 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj',
//             'Accept-Encoding': 'gzip,deflate',

//             'Content-Length': xml.length
//         }
//     }

//     var req = http.request(http_options, (res) => {
//         console.log(`STATUS: ${res.statusCode}`);
//         console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

//         res.setEncoding('utf8');

//         var resultStr = '';

//         res.on('data', (chunk) => {
//             // if (res.statusCode == '200') {
//             console.log(`BODY: ${chunk}`);

//             resultStr += chunk;
//             //  }
//         });

//         res.on('end', () => {
//             console.log('No more data in response.');

//             if (resultStr.length > 0) {
//                 body = resultStr.match(/<s:Body>[\s\S]*?<\/s:Body>/g);
//                 if (body.length > 0) {

//                     getResultFromXML(body, 'Zaloguj', (sid, err) => {
//                         result(sid, err)
//                     })

//                 } else {
//                     result('', "bad login")
//                 }

//             }

//         })
//     });

//     req.on('error', (err) => {
//         console.log(`problem with request: ${err.message}`);
//         result('', err)
//     });

//     // write data to request body 
//     console.log(" === req.write(xml) === ");
//     req.write(xml); // xml would have been set somewhere to a complete xml document in the form of a string 
//     req.end();
// }


// function logout(sid) {

//     var xml = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">' +
//         '<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">' +
//         '<wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>' +
//         '<wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Wyloguj</wsa:Action>' +
//         '</soap:Header>' +
//         '<soap:Body>' +
//         '<ns:Wyloguj>' +
//         '<ns:pIdentyfikatorSesji>' + sid + '</ns:pIdentyfikatorSesji>' +
//         '</ns:Wyloguj>' +
//         '</soap:Body>' +
//         '</soap:Envelope>';


//     var http = require('https');
//     var http_options = {
//         hostname: 'wyszukiwarkaregon.stat.gov.pl',
//         //url: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
//         //port: 443, 
//         path: '/wsBIR/UslugaBIRzewnPubl.svc',
//         method: 'POST',
//         //  body: xml,
//         Connection: 'Keep-Alive',
//         headers: {
//             'Connection': 'Keep-Alive',
//             // 'sid': sid, 
//             'Content-Type': 'application/soap+xml;charset=UTF-8',
//             'action': 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Wyloguj',
//             'Accept-Encoding': 'gzip,deflate',
//             'Content-Length': xml.length
//         }
//     }

//     var req = http.request(http_options, (res) => {
//         console.log(`STATUS: ${res.statusCode}`);
//         console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//         res.setEncoding('utf8');


//         var resultStr = '';

//         res.on('data', (chunk) => {
//             console.log(`BODY: ${chunk}`);
//         });

//         res.on('end', () => {
//             console.log('No more data in response.');
//         })

//     });

//     req.on('error', (err) => {
//         console.log(`problem with request: ${err.message}`);
//     });

//     // write data to request body 
//     req.write(xml); // xml would have been set somewhere to a complete xml document in the form of a string 
//     req.end();
// }


// function getDaneSzukaj(sid, nib, result) {

//     var xml = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07" xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract">' +
//         '<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">' +
//         '<wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>' +
//         '<wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukaj</wsa:Action>' +
//         '</soap:Header>' +
//         '<soap:Body>' +
//         '<ns:DaneSzukaj>' +
//         '<ns:pParametryWyszukiwania>' +
//         '<dat:Nip>' + nib + '</dat:Nip>' +
//         '</ns:pParametryWyszukiwania>' +
//         '</ns:DaneSzukaj>' +
//         '</soap:Body>' +
//         '</soap:Envelope>'



//     var http = require('https');
//     var http_options = {
//         hostname: 'wyszukiwarkaregon.stat.gov.pl',
//         //url: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
//         //port: 443, 
//         path: '/wsBIR/UslugaBIRzewnPubl.svc',
//         method: 'POST',
//         //  body: xml,
//         Connection: 'Keep-Alive',
//         headers: {
//             'Connection': 'Keep-Alive',
//             'sid': sid,
//             'Content-Type': 'application/soap+xml;charset=UTF-8',
//             'action': 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukaj',
//             'Accept-Encoding': 'gzip,deflate',
//             'Content-Length': xml.length
//         }
//     }

//     var req = http.request(http_options, (res) => {
//         // console.log(`STATUS: ${res.statusCode}`); 
//         // console.log(`HEADERS: ${JSON.stringify(res.headers)}`); 
//         res.setEncoding('utf8');

//         var resultStr = '';

//         res.on('data', (chunk) => {
//             //            if (res.statusCode == '200') {
//             // console.log(`BODY: ${chunk}`); 

//             resultStr += chunk;
//             //         }
//         });

//         res.on('end', () => {
//             console.log('No more data in response.');

//             body = resultStr.match(/<s:Body>[\s\S]*?<\/s:Body>/g);
//             if (body.length > 0) {
//                 getResultFromXML(body, 'DaneSzukaj', (sid, err) => {
//                     result(sid, err)
//                 })

//             }
//         })
//     });

//     req.on('error', (err) => {
//         console.log(`problem with request: ${err.message}`);
//         result('', err)
//     });

//     // write data to request body 
//     req.write(xml); // xml would have been set somewhere to a complete xml document in the form of a string 
//     req.end();
// }



// function getDanePobierzPelnyRaport(sid, customer, result) {

//     nameReport = "PublDaneRaportDzialalnoscFizycznejCeidg"

//     if (customer.Typ === "P" || customer.Typ === "LP") {
//         nameReport = 'PublDaneRaportPrawna'
//     }



//     var xml = '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">' +
//         '<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">' +
//         '<wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>' +
//         '<wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DanePobierzPelnyRaport</wsa:Action>' +
//         '</soap:Header>' +
//         '<soap:Body>' +
//         '<ns:DanePobierzPelnyRaport>' +
//         '<ns:pRegon>' + customer.Regon + '</ns:pRegon>' +
//         '<ns:pnameRaportu>' + nameReport + '</ns:pnameRaportu>' +
//         '</ns:DanePobierzPelnyRaport>' +
//         '</soap:Body>' +
//         '</soap:Envelope>'

//     var http = require('https');
//     var http_options = {
//         hostname: 'wyszukiwarkaregon.stat.gov.pl',
//         //url: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',PublDaneRaportFizycznaOsoba  PublDaneRaportDzialalnoscFizycznejCeidg
//         //port: 443, 
//         path: '/wsBIR/UslugaBIRzewnPubl.svc',
//         method: 'POST',
//         //  body: xml,
//         Connection: 'Keep-Alive',
//         headers: {
//             'Connection': 'Keep-Alive',
//             'sid': sid,
//             'Content-Type': 'application/soap+xml;charset=UTF-8',
//             'action': 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DanePobierzPelnyRaport',
//             'Accept-Encoding': 'gzip,deflate',
//             'Content-Length': xml.length
//         }
//     }

//     var req = http.request(http_options, (res) => {
//         // console.log(`STATUS: ${res.statusCode}`); 
//         // console.log(`HEADERS: ${JSON.stringify(res.headers)}`); 
//         res.setEncoding('utf8');

//         var resultStr = '';

//         res.on('data', (chunk) => {
//             // if (res.statusCode == '200') {
//             // console.log(`BODY: ${chunk}`); 

//             resultStr += chunk;
//             //    }
//         });

//         res.on('end', () => {
//             console.log('No more data in response.');

//             body = resultStr.match(/<s:Body>[\s\S]*?<\/s:Body>/g);
//             if (body.length > 0) {
//                 getResultFromXML(body, 'DanePobierzPelnyRaport', (res, err) => {


//                     result(res, customer, err)
//                 })

//             }
//         })
//     });

//     req.on('error', (err) => {
//         console.log(`problem with request: ${err.message}`);
//         result('', err)
//     });

//     // write data to request body 
//     req.write(xml); // xml would have been set somewhere to a complete xml document in the form of a string 
//     req.end();
// }











// getCustomerNIP = functions.https.onRequest((request, response) => {

//     const nip = request.query.nip;

//     console.log("nip = " + nip);

//     console.log("request");
//     console.log(request);

//     login((sid, err) => {
//         if (!err) {
//             console.log("sid = " + sid);
//             getDaneSzukaj(sid, nip, (body, err) => {
//                 if (!err && body) {
//                     console.log(body)
//                     getDaneSzukajFromXML(body, (res, err) => {
//                         if (!err && res) {
//                             getDanePobierzPelnyRaport(sid, res, (res, customer, err) => {
//                                 if (!err && res) {

//                                     customer["nip_my"] = nip;

//                                     getDanePobierzPelnyRaportFromXML(res, customer, (res, err) => {

//                                         if (!err && res) {
//                                             response.json(res);
//                                         } else {
//                                             response.status(505).json({ message: 'getDanePobierzPelnyRaportFromXML', error: err });
//                                             logout(sid);
//                                         }

//                                     })

//                                     logout(sid);

//                                 } else {
//                                     response.status(504).json({ message: 'getDaneSzukajFromXML', error: err });
//                                     logout(sid);
//                                 }
//                             })
//                         } else {
//                             console.log(err)
//                             response.status(503).json({ message: 'getDaneSzukajFromXML', error: err });
//                             logout(sid);
//                         }
//                     })
//                 } else {
//                     console.log(err)
//                     response.status(502).json({ message: 'getDaneSzukaj', error: err });
//                     logout(sid);
//                 }
//             })
//         } else {
//             response.status(501).json({ message: 'login', error: err });
//         }
//     })
// });



// const express = require('express');
// const app = express();

// app.use(cors);


// app.get('/getCustomerNIP', getCustomerNIP);

// exports.app = functions.https.onRequest(app);

// login((sid, err) => {
//     if (!err) {
//         console.log(sid)

//         getDaneSzukaj(sid, '5213672246', (body,err) => {
//             if (!err) {
//                 console.log(body) 
// // TODO sample values 

//                 getDaneSzukajFromXML(body, (res, err) => {
//                     if (!err) {
//                         getDanePobierzPelnyRaport(sid, res.Regon, (res, err) => {

//                             console.log(res)

//                             logout(sid);
//                         })
//                     } else {
//                         console.log(err) 
//                     }
//                 })
//             } else {
//                 console.log(err) 
//             }
//         } )
//     }


// })


// const express = require('express');
// const http = require('http');

// const app = express();

// app.get('/getCustomerNIP', getCustomerNIP);

// //initialize a simple http server
// const server = http.createServer(app);

// //start our server
// server.listen(process.env.PORT || 5432, () => {
//     console.log(`Server started on port ${server.address().port} :)`);
// });