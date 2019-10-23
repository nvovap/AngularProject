

var parseString = require('xml2js').parseString;

var cheerio = require('cheerio');


function getDaneSzukajFromXML(xml, res) {
    parseString(xml, function (err, result) {
        if (!err) {

            var arrRes = result.root.dane[0];

            var resultJSON = {
                Regon : arrRes.Regon[0],
                Nazwa : arrRes.Nazwa[0],
                Wojewodztwo : arrRes.Wojewodztwo[0],
                Powiat : arrRes.Powiat[0],
                Miejscowosc : arrRes.Miejscowosc[0],
                KodPocztowy : arrRes.KodPocztowy[0],
                Ulica : arrRes.Ulica[0],
                Typ : arrRes.Typ[0],
                SilosID : arrRes.SilosID[0],
                RegonLink : arrRes.RegonLink[0]
            }

            res(resultJSON, err);
        } else {
            res('', err)
        }
    });
}


function getDanePobierzPelnyRaportFromXML(xml, customer, organization, res) {
    parseString(xml, function (err, result) {
        if (!err) {

            //praw
            var arrRes = result.root.dane[0];

            prefix = 'fiz'
            if (customer.Typ === "P" || customer.Typ === "LP") {
                prefix = 'praw'
            }


            ulica = arrRes[prefix + '_adSiedzUlica_Nazwa'][0];

            house = adSiedzNumerNieruchomosci =  arrRes[prefix + '_adSiedzNumerNieruchomosci'][0];
            flat = adSiedzNumerLokalu        =  arrRes[prefix + '_adSiedzNumerLokalu'][0];

            ulica = ulica + ' ' + house;

            if (flat !== '') {
                ulica = ulica + '/' + flat;
            }



            var resultJSON = {}

            if (organization) {

                resultJSON = {

                    NIP: customer.nip_my,
    
                    name                 : arrRes[prefix + '_nazwa'][0],
                    telefon1             : arrRes[prefix + '_numerTelefonu'][0],
                    telefon2             : arrRes[prefix + '_numerWewnetrznyTelefonu'][0],
                    fax                  : arrRes[prefix + '_numerFaksu'][0],
                    adresEmail           : arrRes[prefix + '_adresEmail'][0],
                    emailFaktury         : arrRes[prefix + '_adresEmail'][0],
                    www                  : arrRes[prefix + '_adresStronyinternetowej'][0],
    
    
                    identyfikator:  "",
                    prefiksUE:  "PL",
                
      
                    adres: { 
    
                        ulicaNumer          : ulica,
                        adresZagraniczny    : false,
                        kodPocztowy         : arrRes[prefix + '_adSiedzKodPocztowy'][0],
                        miejscowosc         : arrRes[prefix + '_adSiedzMiejscowosc_Nazwa'][0],
                        kraj                : arrRes[prefix + '_adSiedzKraj_Nazwa'][0],
                    },
    
                    uwagi: ""
                }


            } else {

               resultJSON = {

                    NIP: customer.nip_my,
    
                    name                : arrRes[prefix + '_nazwa'][0],
                    telefon1             : arrRes[prefix + '_numerTelefonu'][0],
                    telefon2             : arrRes[prefix + '_numerWewnetrznyTelefonu'][0],
                    fax                  : arrRes[prefix + '_numerFaksu'][0],
                    adresEmail           : arrRes[prefix + '_adresEmail'][0],
                    emailFaktury         : arrRes[prefix + '_adresEmail'][0],
                    www                  : arrRes[prefix + '_adresStronyinternetowej'][0],
    
    
                    identyfikator:  "",
                    prefiksUE:  "PL",
                    
                    dostawca: false,
                    odbiorca: false,
                    kontrahentJestOsobaFizyczna: false,
                    zgodaNaOtrzymywanieEFaktur: false,
                    zgodaNaPrzetwarzanieWCelachMarketingowych: false,
                    numberKonta:  "",
                    nameBanku: "",
      
                    adres: { 
    
                        ulicaNumer          : ulica,
                        adresZagraniczny    : false,
                        kodPocztowy         : arrRes[prefix + '_adSiedzKodPocztowy'][0],
                        miejscowosc         : arrRes[prefix + '_adSiedzMiejscowosc_Nazwa'][0],
                        kraj                : arrRes[prefix + '_adSiedzKraj_Nazwa'][0],
                    },
    
                    adresKorespondencyjny: {  ulicaNumer:  "",
                      adresZagraniczny:  false,
                      kodPocztowy:  "",
                      miejscowosc:  "",
                      kraj:  ""},
            
                    adresDelivery: {  
                        ulicaNumer:  "",
                        adresZagraniczny:  false,
                        kodPocztowy:  "",
                        miejscowosc:  "",
                        kraj:  ""
                    },
    
                    wysylajFakturyNaObaAdresyEmail:  false,
                    uwagi: ""
                }

            }

            


                // praw_regon14 : arrRes.praw_regon14[0],
                // praw_nip : arrRes.praw_nip[0],
                // praw_nazwaSkrocona : arrRes.praw_nazwa[0],
                // praw_numerWrejestrzeEwidencji : arrRes.praw_numerWrejestrzeEwidencji[0],
                // praw_dataPowstania : arrRes.praw_dataPowstania[0],
                // praw_dataRozpoczeciaDzialalnosci : arrRes.praw_dataRozpoczeciaDzialalnosci[0],
                // praw_dataWpisuDoREGON : arrRes.praw_dataWpisuDoREGON[0],
                // praw_dataZawieszeniaDzialalnosci : arrRes.praw_dataZawieszeniaDzialalnosci[0],
                // praw_dataWznowieniaDzialalnosci : arrRes.praw_dataWznowieniaDzialalnosci[0],
                // praw_dataZaistnieniaZmiany : arrRes.praw_dataZaistnieniaZmiany[0],
                // praw_dataZakonczeniaDzialalnosci    : arrRes.praw_dataZakonczeniaDzialalnosci[0],
                // praw_dataSkresleniazRegon           : arrRes.praw_dataSkresleniazRegon[0],
                // praw_adSiedzKraj_Symbol             : arrRes.praw_dataZakonczeniaDzialalnosci[0],
                // praw_adSiedzWojewodztwo_Symbol      : arrRes.praw_adSiedzWojewodztwo_Symbol[0],
                // praw_adSiedzPowiat_Symbol           : arrRes.praw_adSiedzPowiat_Symbol[0],
                // praw_adSiedzGmina_Symbol            : arrRes.praw_adSiedzGmina_Symbol[0],
                // praw_adSiedzMiejscowoscPoczty_Symbol  : arrRes.praw_adSiedzMiejscowoscPoczty_Symbol[0],               
                // praw_adSiedzMiejscowosc_Symbol             : arrRes.praw_adSiedzMiejscowosc_Symbol[0],
                // praw_adSiedzUlica_Symbol             : arrRes.praw_adSiedzUlica_Symbol[0],
                // praw_adSiedzNietypoweMiejsceLokalizacji             : arrRes.praw_adSiedzNietypoweMiejsceLokalizacji[0],
                // praw_adresEmail2             : arrRes.praw_adresEmail2[0],
                // praw_adKorKraj_Symbol             : arrRes.praw_adKorKraj_Symbol[0],
                // praw_adKorWojewodztwo_Symbol        : arrRes.praw_adKorWojewodztwo_Symbol[0],
                // praw_adKorPowiat_Symbol             : arrRes.praw_adKorPowiat_Symbol[0],
                // praw_adKorGmina_Symbol             : arrRes.praw_adKorGmina_Symbol[0],
                // praw_adKorKodPocztowy             : arrRes.praw_adKorKodPocztowy[0],
                // praw_adKorMiejscowosciPoczty_Symbol      : arrRes.praw_adKorMiejscowosciPoczty_Symbol[0],
                // praw_adKorMiejscowosc_Symbol             : arrRes.praw_adKorMiejscowosc_Symbol[0],
                // praw_adKorUlica_Symbol                   : arrRes.praw_adKorUlica_Symbol[0],
                // praw_adKorNumerNieruchomosci             : arrRes.praw_adKorNumerNieruchomosci[0],
                // praw_adKorNumerLokalu                    : arrRes.praw_adKorNumerLokalu[0],
                // praw_adKorNietypoweMiejsceLokalizacji    : arrRes.praw_adKorNietypoweMiejsceLokalizacji[0],
                // praw_adKorNazwaPodmiotuDoKorespondencji  : arrRes.praw_adKorNazwaPodmiotuDoKorespondencji[0],
                // praw_adSiedzWojewodztwo_Nazwa  : arrRes.praw_adSiedzWojewodztwo_Nazwa[0],
                // praw_adSiedzPowiat_Nazwa  : arrRes.praw_adSiedzPowiat_Nazwa[0],
                // praw_adSiedzGmina_Nazwa  : arrRes.praw_adSiedzGmina_Nazwa[0],
                // praw_adSiedzMiejscowoscPoczty_Nazwa  : arrRes.praw_adSiedzMiejscowoscPoczty_Nazwa[0],
                // praw_adKorKraj_Nazwa  : arrRes.praw_adKorKraj_Nazwa[0], 
                // praw_adKorWojewodztwo_Nazwa  : arrRes.praw_adKorWojewodztwo_Nazwa[0],
                // praw_adKorPowiat_Nazwa  : arrRes.praw_adKorPowiat_Nazwa[0],
                // praw_adKorGmina_Nazwa  : arrRes.praw_adKorGmina_Nazwa[0],
                // praw_adKorMiejscowosc_Nazwa  : arrRes.praw_adKorMiejscowosc_Nazwa[0],
                // praw_adKorMiejscowoscPoczty_Nazwa  : arrRes.praw_adKorMiejscowoscPoczty_Nazwa[0],
                // praw_adKorUlica_Nazwa  : arrRes.praw_adKorUlica_Nazwa[0],
                // praw_podstawowaFormaPrawna_Symbol  : arrRes.praw_podstawowaFormaPrawna_Symbol[0],
                // praw_szczegolnaFormaPrawna_Symbol  : arrRes.praw_szczegolnaFormaPrawna_Symbol[0],
                // praw_formaFinansowania_Symbol  : arrRes.praw_formaFinansowania_Symbol[0],  
                // praw_formaWlasnosci_Symbol  : arrRes.praw_formaWlasnosci_Symbol[0],
                // praw_organZalozycielski_Symbol  : arrRes.praw_organZalozycielski_Symbol[0],
                // praw_organRejestrowy_Symbol  : arrRes.praw_organRejestrowy_Symbol[0],
                // praw_rodzajRejestruEwidencji_Symbol  : arrRes.praw_rodzajRejestruEwidencji_Symbol[0],
                // praw_podstawowaFormaPrawna_Nazwa  : arrRes.praw_podstawowaFormaPrawna_Nazwa[0],
                // praw_szczegolnaFormaPrawna_Nazwa  : arrRes.praw_szczegolnaFormaPrawna_Nazwa[0],
                // praw_formaFinansowania_Nazwa  : arrRes.praw_formaFinansowania_Nazwa[0],
                // praw_formaWlasnosci_Nazwa  : arrRes.praw_formaWlasnosci_Nazwa[0],
                // praw_organZalozycielski_Nazwa  : arrRes.praw_organZalozycielski_Nazwa[0],
                // praw_organRejestrowy_Nazwa  : arrRes.praw_organRejestrowy_Nazwa[0],
                // praw_rodzajRejestruEwidencji_Nazwa  : arrRes.praw_rodzajRejestruEwidencji_Nazwa[0],
                // praw_jednostekLokalnych  : arrRes.praw_jednostekLokalnych[0],
                // praw_dataWpisuDoRejestruEwidencji  : arrRes.praw_dataWpisuDoRejestruEwidencji[0],
        
            

            res(resultJSON, err);
        } else {
            res('', err)
        }
    });
}

function getResultFromXML(xml, param, res) {
    parseString(xml, function (err, result) {
        if (!err) {
            res(result['s:Body'][param+'Response'][0][param+'Result'][0], err);
        } else {
            res('', err)
        }
    });
}

"DaneSzukajResult"

function login(result) {
    
    
    
    code = 'd0d2257f78a44a47a794'



    var xml =   '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">' +
                '<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">' + 
                '<wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>' +
                '<wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj</wsa:Action>' +
                '</soap:Header>'+
                '<soap:Body>' +
                '<ns:Zaloguj>' +
                '<ns:pKluczUzytkownika>'+code+'</ns:pKluczUzytkownika>'+
                '</ns:Zaloguj>'+
                '</soap:Body>'+
                '</soap:Envelope>'


                var http = require('https'); 
                var http_options = { 
                    hostname: 'wyszukiwarkaregon.stat.gov.pl', 
                    //url: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
                    //port: 443, 
                    path: '/wsBIR/UslugaBIRzewnPubl.svc', 
                    method: 'POST', 
                  //  body: xml,
                    Connection: 'Keep-Alive',
                    headers: { 
                        'Connection': 'Keep-Alive',
                    //'Content-Type': 'application/soap+xml', 
                    'Content-Type': 'application/soap+xml;charset=UTF-8', 
                    'action' : 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Zaloguj',
                    'Accept-Encoding': 'gzip,deflate',
                
                    'Content-Length': xml.length 
                    } 
                } 
                
                var req = http.request(http_options, (res) => { 
                    console.log(`STATUS: ${res.statusCode}`); 
                    console.log(`HEADERS: ${JSON.stringify(res.headers)}`); 

                    res.setEncoding('utf8'); 
                    
                    var resultStr = '';
                    
                    res.on('data', (chunk) => { 
                       // if (res.statusCode == '200') {
                            console.log(`BODY: ${chunk}`); 
                
                            resultStr += chunk;
                      //  }
                    }); 
                
                    res.on('end',() => { 
                        console.log('No more data in response.');

                        if (resultStr.length > 0) {
                            body = resultStr.match(/<s:Body>[\s\S]*?<\/s:Body>/g);
                            if (body.length > 0) {
                
                                getResultFromXML(body, 'Zaloguj', (sid, err) => {
                                    result(sid, err)
                                })
                
                            } else  {
                                result('', "bad login")
                            }

                        }
            
                    }) 
                }); 
                
                req.on('error', (err) => { 
                    console.log(`problem with request: ${err.message}`); 
                    result('', err)
                }); 

                // write data to request body 
                console.log(" === req.write(xml) === ");
                req.write(xml); // xml would have been set somewhere to a complete xml document in the form of a string 
                req.end(); 
}


function logout(sid) {

    var xml =   '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">' +
                '<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">' + 
                '<wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>' +
                '<wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Wyloguj</wsa:Action>' +
                '</soap:Header>'+
                '<soap:Body>' +
                '<ns:Wyloguj>' +
                    '<ns:pIdentyfikatorSesji>' + sid + '</ns:pIdentyfikatorSesji>' +
                '</ns:Wyloguj>'+
                '</soap:Body>'+
                '</soap:Envelope>';


                var http = require('https'); 
                var http_options = { 
                    hostname: 'wyszukiwarkaregon.stat.gov.pl', 
                    //url: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
                    //port: 443, 
                    path: '/wsBIR/UslugaBIRzewnPubl.svc', 
                    method: 'POST', 
                  //  body: xml,
                    Connection: 'Keep-Alive',
                    headers: { 
                        'Connection': 'Keep-Alive',
                        // 'sid': sid, 
                        'Content-Type': 'application/soap+xml;charset=UTF-8', 
                        'action' : 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/Wyloguj',
                        'Accept-Encoding': 'gzip,deflate',
                        'Content-Length': xml.length 
                    } 
                } 
                
                var req = http.request(http_options, (res) => { 
                    console.log(`STATUS: ${res.statusCode}`); 
                    console.log(`HEADERS: ${JSON.stringify(res.headers)}`); 
                    res.setEncoding('utf8'); 


                    var resultStr = '';
                    
                    res.on('data', (chunk) => { 
                        console.log(`BODY: ${chunk}`); 
                    }); 
                
                    res.on('end',() => { 
                        console.log('No more data in response.');
                    }) 
                   
                }); 
                
                req.on('error', (err) => { 
                    console.log(`problem with request: ${err.message}`); 
                }); 

                // write data to request body 
                req.write(xml); // xml would have been set somewhere to a complete xml document in the form of a string 
                req.end(); 
}


function getDaneSzukaj(sid, nib, result) {

    var xml =   '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07" xmlns:dat="http://CIS/BIR/PUBL/2014/07/DataContract">' +
                '<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">' + 
                '<wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>' +
                '<wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukaj</wsa:Action>' +
                '</soap:Header>'+
                '<soap:Body>' +
                '<ns:DaneSzukaj>' +
                    '<ns:pParametryWyszukiwania>' +
                        '<dat:Nip>' + nib + '</dat:Nip>' +
                    '</ns:pParametryWyszukiwania>' +
                '</ns:DaneSzukaj>'+
                '</soap:Body>'+
                '</soap:Envelope>'



                var http = require('https'); 
                var http_options = { 
                    hostname: 'wyszukiwarkaregon.stat.gov.pl', 
                    //url: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',
                    //port: 443, 
                    path: '/wsBIR/UslugaBIRzewnPubl.svc', 
                    method: 'POST', 
                  //  body: xml,
                    Connection: 'Keep-Alive',
                    headers: { 
                        'Connection': 'Keep-Alive',
                        'sid': sid, 
                        'Content-Type': 'application/soap+xml;charset=UTF-8', 
                        'action' : 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DaneSzukaj',
                        'Accept-Encoding': 'gzip,deflate',
                        'Content-Length': xml.length 
                    } 
                } 
                
                var req = http.request(http_options, (res) => { 
                    // console.log(`STATUS: ${res.statusCode}`); 
                    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`); 
                    res.setEncoding('utf8'); 
                    
                    var resultStr = '';
                    
                    res.on('data', (chunk) => { 
            //            if (res.statusCode == '200') {
                            // console.log(`BODY: ${chunk}`); 
                
                            resultStr += chunk;
               //         }
                    }); 
                
                    res.on('end',() => { 
                        console.log('No more data in response.');
                
                        body = resultStr.match(/<s:Body>[\s\S]*?<\/s:Body>/g);
                        if (body.length > 0) {
                            getResultFromXML(body, 'DaneSzukaj',(sid, err) => {
                                result(sid, err)
                            })
                
                        }
                    }) 
                }); 
                
                req.on('error', (err) => { 
                    console.log(`problem with request: ${err.message}`); 
                    result('', err)
                }); 

                // write data to request body 
                req.write(xml); // xml would have been set somewhere to a complete xml document in the form of a string 
                req.end(); 
}



function getDanePobierzPelnyRaport(sid, customer, result) {

    nameReport = "PublDaneRaportDzialalnoscFizycznejCeidg"

    if (customer.Typ === "P" || customer.Typ === "LP") {
        nameReport = 'PublDaneRaportPrawna'
    }



    var xml =   '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope" xmlns:ns="http://CIS/BIR/PUBL/2014/07">' +
                '<soap:Header xmlns:wsa="http://www.w3.org/2005/08/addressing">' + 
                '<wsa:To>https://wyszukiwarkaregon.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc</wsa:To>' +
                '<wsa:Action>http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DanePobierzPelnyRaport</wsa:Action>' +
                '</soap:Header>'+
                '<soap:Body>' +
                '<ns:DanePobierzPelnyRaport>' +
                        '<ns:pRegon>' + customer.Regon + '</ns:pRegon>' +
                        '<ns:pNazwaRaportu>'+nameReport+'</ns:pNazwaRaportu>' +
                '</ns:DanePobierzPelnyRaport>' +
                '</soap:Body>'+
                '</soap:Envelope>'

                var http = require('https'); 
                var http_options = { 
                    hostname: 'wyszukiwarkaregon.stat.gov.pl', 
                    //url: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',PublDaneRaportFizycznaOsoba  PublDaneRaportDzialalnoscFizycznejCeidg
                    //port: 443, 
                    path: '/wsBIR/UslugaBIRzewnPubl.svc', 
                    method: 'POST', 
                  //  body: xml,
                    Connection: 'Keep-Alive',
                    headers: { 
                        'Connection': 'Keep-Alive',
                        'sid': sid, 
                        'Content-Type': 'application/soap+xml;charset=UTF-8', 
                        'action' : 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DanePobierzPelnyRaport',
                        'Accept-Encoding': 'gzip,deflate',
                        'Content-Length': xml.length 
                    } 
                } 
                
                var req = http.request(http_options, (res) => { 
                    // console.log(`STATUS: ${res.statusCode}`); 
                    // console.log(`HEADERS: ${JSON.stringify(res.headers)}`); 
                    res.setEncoding('utf8'); 
                    
                    var resultStr = '';
                    
                    res.on('data', (chunk) => { 
                       // if (res.statusCode == '200') {
                            // console.log(`BODY: ${chunk}`); 
                
                            resultStr += chunk;
                    //    }
                    }); 
                
                    res.on('end',() => { 
                        console.log('No more data in response.');
                
                        body = resultStr.match(/<s:Body>[\s\S]*?<\/s:Body>/g);
                        if (body.length > 0) {
                            getResultFromXML(body, 'DanePobierzPelnyRaport',(res, err) => {
                               

                                result(res, customer, err)
                            })
                
                        }
                    }) 
                }); 
                
                req.on('error', (err) => { 
                    console.log(`problem with request: ${err.message}`); 
                    result('', err)
                }); 

                // write data to request body 
                req.write(xml); // xml would have been set somewhere to a complete xml document in the form of a string 
                req.end(); 
}



function getForNIP(request, response, organization) {

    const nip = request.query.nip;

    console.log( "nip = " + nip );

    console.log( "request" );
    console.log( request );

    login((sid, err) => {
        if (!err) {
            console.log( "sid = " + sid );
            getDaneSzukaj(sid, nip, (body,err) => {
                if (!err && body) {
                    console.log(body) 
                    getDaneSzukajFromXML(body, (res, err) => {
                        if (!err && res)  {
                            getDanePobierzPelnyRaport(sid, res, (res, customer, err) => {
                                if (!err && res) {

                                    customer["nip_my"] = nip;

                                    getDanePobierzPelnyRaportFromXML(res, customer, organization,  (res, err) => {

                                        if (!err && res) {
                                            response.json(res);
                                        } else {
                                            response.status(505).json({message : 'getDanePobierzPelnyRaportFromXML' , error : err});
                                            logout(sid);
                                        }  
                                        
                                    })
                                    
                                    logout(sid);

                                } else {
                                    response.status(504).json({message : 'getDaneSzukajFromXML' , error : err});
                                    logout(sid);
                                }
                            })
                        } else {
                            console.log(err) 
                            response.status(503).json({message : 'getDaneSzukajFromXML' , error : err});
                            logout(sid);
                        }
                    })
                } else {
                    console.log(err) 
                    response.status(502).json({message : 'getDaneSzukaj' , error : err});
                    logout(sid);
                }
            } )
        } else {
            response.status(501).json({message : 'login' , error : err});
        }
    })
};



function getCustomerNIP(request, response) {
    getForNIP(request, response, false)
};


function getOrganizationNIP(request, response) {
    getForNIP(request, response, true)
};




function getSummmaInWords(request, response) {

    const summa = request.query.summa;

    var https = require('https'); 

    var http_options = { 
        hostname: 'slownie.pl', 
        //url: 'https://wyszukiwarkaregontest.stat.gov.pl/wsBIR/UslugaBIRzewnPubl.svc',PublDaneRaportFizycznaOsoba  PublDaneRaportDzialalnoscFizycznejCeidg
        //port: 443, 
        path: '/'+summa, 
        method: 'GET', 
     //   strictSSL: false

      //  body: xml,
      //  Connection: 'Keep-Alive',
        // headers: { 
        //     'Connection': 'Keep-Alive',
        //     'sid': sid, 
        //     'Content-Type': 'application/soap+xml;charset=UTF-8', 
        //     'action' : 'http://CIS/BIR/PUBL/2014/07/IUslugaBIRzewnPubl/DanePobierzPelnyRaport',
        //     'Accept-Encoding': 'gzip,deflate',
        //     'Content-Length': xml.length 
        // } 
    } 

    console.log(process.env["NODE_TLS_REJECT_UNAUTHORIZED"]);


    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

    resultStr = "";

    https.get(http_options, (res) => {

        res.on('data', (chunk) => { 
            resultStr += chunk;
        }); 

        res.on('end', () => {
            var $ = cheerio.load(resultStr);
            
            var summaWords = $('.word').text()

            console.log(summaWords);

            //response.end(summaWords);
            response.json( {result: summaWords} );
        })
    })

};

//<p id="dataWord" class="word">jeden tysiąc dwieście  złotych  00/100</p>
//$('.word').text()


const express = require('express');
const http = require('http');

const app = express();

//Cross-Origin Resource Sharing 
var cors = require('cors')
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}


app.use(cors(corsOptions))
//Cross-Origin Resource Sharing 

app.get('/getCustomerNIP', getCustomerNIP);
app.get('/getOrganizationNIP', getOrganizationNIP);


app.get('/getSummmaInWords', getSummmaInWords);







//initialize a simple http server
const server = http.createServer(app);

//start our server
server.listen(process.env.PORT || 5432, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

//5213672246
//6262618201
//8721525814