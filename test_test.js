/*
1) Переходим на https://www.reg.ru/
2) Авторизуемся
3) Переходим на страницу заказа “сервер для бизнеса”:
4) Запоминаем цену на странице, жмем на “заказать”
5) Попадаем в корзину, сверяем цену, смотрим, что в корзине нужная услуга
6) Нажимаем “перейти к оплате”
7) Сверяем цену с предыдущей:
*/
Feature('Buying a service');

Scenario('test something', async (I) => {
    I.amOnPage('https://www.reg.ru');
    I.click("[class*='i-auth__open-login-tab']");
    // Работает через раз, падает с ошибкой "Field [class*='b-authorize-form__field-login'] was not found by text|CSS|XPath"
    // Причина - не успевает появиться поле ввода, нужно добавить его ожидание
    I.waitForElement("[name='login']", 10);
    I.fillField("[class*='b-authorize-form__field-login']", 'bannov_ilya@mail.ru');
    I.fillField("[class*='b-authorize-form__field-password']", 'H_hpz8Ef');
    I.click("[class*='b-authorize-form__submit-btn']");
    // Здесь может быть ситуация, когда авторизация не успела пройти, лучше сделать явное ожидание элемента, подтверждающего авторизацию
    I.waitForElement(`//span[contains(., 'Bannov_ilya@mail.ru')]`, 10);
    I.amOnPage('https://www.reg.ru/biz-server');
    I.waitForElement("[class*='b-price__amount']", 10);
    const price = await I.grabTextFrom("[class*='b-price__amount']");
    const nameServ = await I.grabTextFrom("[class*='b-title b-title_color_invert b-title_size_huge-compact']");
    I.click("[class*='b-button b-button_color_primary b-button_size_big']");
    I.waitForElement("[class*='value']", 10);
    const priceTwo = await I.grabTextFrom("[class*='value']");
    const name = await I.grabTextFrom("[class*='name']");

    console.log(name);
    console.log(nameServ);
    // Не совсем верная логика теста: при любом поведении, которое не соответсвует ожиданиям (не сходится цена, название и т.д.), скрипт должен завершаться с ошибкой
    console.log("Service matching: ");
    if (name.includes(nameServ)) {
        console.log("Services match");
    } else {
        console.log("Don't Services match");
    }

    console.log("First price check :");
    if (priceTwo == price) {
        console.log("Price true : " + "Price when ordering: " + price + " Basket price: " + priceTwo);
    } else {
        console.log("Price false : " + "Price when ordering: " + price + " Basket price: " + priceTwo);
    }

    I.click("[class*='b-button b-button_color_primary b-button_size_medium i-analytics']");
    I.waitForElement("[class*='b-paytype__title-price l-margin_bottom-small']", 10);
    const priceThree = await I.grabTextFrom("[class*='b-paytype__title-price l-margin_bottom-small']");

    testPriceThree = priceThree.replace(/\D+/g, '');
    testPrice1 = price.replace(/\s+/g, '');


    console.log("Last price check :");
    if (testPriceThree == testPrice1) {
        console.log("Price true : " + "Price when ordering: " + testPriceThree + " Basket price: " + testPrice1);
    } else {
        console.log("Price false : " + "Price when ordering: " + testPriceThree + " Basket price: " + testPrice1);
    }
});

Scenario('test something 2', async (I) => {
    I.amOnPage('https://www.reg.ru');
    I.click("[class*='i-auth__open-login-tab']");
    I.waitForElement("[name='login']", 10);
    I.fillField("[class*='b-authorize-form__field-login']", 'bannov_ilya@mail.ru');
    I.fillField("[class*='b-authorize-form__field-password']", 'H_hpz8Ef');
    I.click("[class*='b-authorize-form__submit-btn']");
    I.waitForElement(`//span[contains(., 'Bannov_ilya@mail.ru')]`, 10);
    I.click("[class*='b-menu__link b-menu__link_submenu_has']");
    I.executeScript("var elements = document.getElementsByClassName('b-submenu__group-link');elements[40].click();");
    I.waitForElement("[class*='b-price__amount']", 10);
    const price = await I.grabTextFrom("[class*='b-price__amount']");
    const nameServ = await I.grabTextFrom("[class*='b-title b-title_color_invert b-title_size_huge-compact']");
    I.click("[class*='b-button b-button_color_primary b-button_size_big']");
    I.waitForElement("[class*='value']", 10);
    const priceTwo = await I.grabTextFrom("[class*='value']");
    const name = await I.grabTextFrom("[class*='name']");

    console.log(name);
    console.log(nameServ);

    console.log("Service matching: ");
    if (name.includes(nameServ)) {
        console.log("Services match");
    } else {
        console.log("Don't Services match");
    }

    console.log("First price check :");
    if (priceTwo == price) {
        console.log("Price true : " + "Price when ordering: " + price + " Basket price: " + priceTwo);
    } else {
        console.log("Price false : " + "Price when ordering: " + price + " Basket price: " + priceTwo);
    }

    I.click("[class*='b-button b-button_color_primary b-button_size_medium i-analytics']");
    I.waitForElement("[class*='b-paytype__title-price l-margin_bottom-small']", 10);
    const priceThree = await I.grabTextFrom("[class*='b-paytype__title-price l-margin_bottom-small']");

    testPriceThree = priceThree.replace(/\D+/g, '');
    testPrice1 = price.replace(/\s+/g, '');

    console.log("Last price check :");
    if (testPriceThree == testPrice1) {
        console.log("Price true : " + "Price when ordering: " + testPriceThree + " Basket price: " + testPrice1);
    } else {
        console.log("Price false : " + "Price when ordering: " + testPriceThree + " Basket price: " + testPrice1);
    }
});
