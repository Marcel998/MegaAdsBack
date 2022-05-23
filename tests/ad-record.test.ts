import {AdRecord} from "../records/ad.record";

const defaultObj = {
    name: 'Test Name',
    description: 'blah',
    url: 'https://megak.pl',
    price: 0,
    lat: 9,
    lon: 9,
};

test('Can build AdRecord', ()=>{
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe('Test Name');
    expect(ad.description).toBe('blah');
});

test('Validates invalid price', ()=>{
    expect(()=> new AdRecord({
        ...defaultObj,
        price: -3,
    })).toThrow('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999.')
});

// @TODO: Check all the validations

// test('Insert ad to database', ()=>{
//     const ad = new AdRecord(defaultObj);
//
//     // const idOfNewRecord = async()=> await ad.insert();
//     //
//     // const newNewIdOfNewRecortAsync = idOfNewRecord();
//
//     // let idUpperScope;
//     // //
//     // (async () => {
//     //     idUpperScope = await ad.insert().then(res => {
//     //         return res
//     //     })
//     // })()
//     //
//     //
//     // console.log({idUpperScope});
//
//     // expect(idUpperScope).toMatch(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/)
//
//     // expect( async()=> await ad.insert()).toBeDefined();
//
//     // expect( newNewIdOfNewRecortAsync).toMatch(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/)
//
//
//     expect(async()=> await ad.insert().then((result)=> {
//         return result
//     }).toMatch(/[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/)
//
// });









