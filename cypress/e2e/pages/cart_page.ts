export class CartPage {
  proceedToCheckoutInCartButtonLocator = '[data-test="proceed-1"]';
  proceedToCheckoutInSignUnButtonLocator = '[data-test="proceed-2"]';
  proceedToCheckoutWithFilledBillingAddressForm = '[data-test="proceed-3"]';
  continueShoppingButtonLocator = '[data-test="continue-shopping"]';
  yourStreetFieldInBillingAddressFormLocator = '[data-test="street"]';
  yourCityFieldInBillingAddressFormLocator = '[data-test="city"]';
  stateFieldInBillingAddressFormLocator = '[data-test="state"]';
  yourCountryFieldInBillingAddressFormLocator = '[data-test="country"]';
  yourPostcodeFieldInBillingAddressFormLocator = '[data-test="postal_code"]';
  paymentMethodDropDownLocator = '[data-test="payment-method"]';
  paymentSuccessfulMessageLocator = '[data-test="payment-success-message"]';
  confirmBtnOnPaymentTabLocator = '[data-test="finish"]';
  paymentSuccessmessageLocator = '[data-test="payment-success-message"]';
  bankNameFieldLocator = '[data-test="bank_name"]';
  bankAccountNameFieldLocator = '[data-test="account_name"]';
  bankAccountNumber = '[data-test="account_number"]';
  creditCardNumberFieldLocator = '[data-test="credit_card_number"]';
  expirationDateFieldLocator = '[data-test="expiration_date"]';
  cvvFieldLocator = '[data-test="cvv"]';
  cardHolderNameFieldLocator = '[data-test="card_holder_name"]';
  chooseMonthlyInstallmentsLocator = '[data-test="monthly_installments"]';
  giftCardNumberFieldsLocator = '[data-test="gift_card_number"]';
  giftCardCalidationCodeFieldLocator = '[data-test="validation_code"]';

  clickProceedToCheckoutButtonFromCartTab() {
    return cy.get(this.proceedToCheckoutInCartButtonLocator).click();
  }

  fillInBillingAddressForm(
    yourStreet: string,
    yourCity: string,
    state: string,
    yourCountry: string,
    yourPostcode: string | number,
  ) {
    cy.get(this.yourStreetFieldInBillingAddressFormLocator)
      .clear()
      .type(yourStreet);
    cy.get(this.yourCityFieldInBillingAddressFormLocator)
      .clear()
      .type(yourCity);
    cy.get(this.stateFieldInBillingAddressFormLocator).clear().type(state);
    cy.get(this.yourCountryFieldInBillingAddressFormLocator)
      .clear()
      .type(yourCountry);
    cy.get(this.yourPostcodeFieldInBillingAddressFormLocator)
      .clear()
      .type(yourPostcode.toString());
  }

  fillInBankTransferForm(
    bankName: string,
    accountName: string,
    accountNumber: string | number,
  ) {
    cy.get(this.bankNameFieldLocator).clear().type(bankName);
    cy.get(this.bankAccountNameFieldLocator).clear().type(accountName);
    cy.get(this.bankAccountNumber).clear().type(accountNumber.toString());
  }

  fillInCreditCardForm(
    creditCardNumber: string,
    expirationDate: string,
    cvv: number,
    cardHolderName: string,
  ) {
    cy.get(this.creditCardNumberFieldLocator)
      .clear()
      .type(creditCardNumber.toString());
    cy.get(this.expirationDateFieldLocator)
      .clear()
      .type(expirationDate.toString());
    cy.get(this.cvvFieldLocator).clear().type(cvv.toString());
    cy.get(this.cardHolderNameFieldLocator).clear().type(cardHolderName);
  }

  fillInGiftCardForm(giftCardNumber: string, validationCode: string) {
    cy.get(this.giftCardNumberFieldsLocator).clear().type(giftCardNumber);
    cy.get(this.giftCardCalidationCodeFieldLocator)
      .clear()
      .type(validationCode);
  }

  clickProceedToCheckoutWithSignedUser() {
    return cy.get(this.proceedToCheckoutInSignUnButtonLocator).click();
  }

  clickProceedToCheckoutWithFilledBillingAddressForm() {
    return cy.get(this.proceedToCheckoutWithFilledBillingAddressForm).click();
  }

  choosePaymentMethod(
    paymentMethod:
      | "bankTransfer"
      | "cashOnDelivery"
      | "creditCard"
      | "buyNowPayLater"
      | "giftCard",
  ) {
    const methods = {
      bankTransfer: "bank-transfer",
      cashOnDelivery: "cash-on-delivery",
      creditCard: "credit-card",
      buyNowPayLater: "buy-now-pay-later",
      giftCard: "gift-card",
    };
    cy.get(this.paymentMethodDropDownLocator)
      .should("exist")
      .and("not.be.disabled")
      .select(methods[paymentMethod]);
  }

  chooseMonthlyInstallments(
    installment: "threeMonths" | "sixMonths" | "nineMonths" | "twelveMonths",
  ) {
    const months = {
      threeMonths: "3",
      sixMonths: "6",
      nineMonths: "9",
      twelveMonths: "12",
    };
    cy.get(this.chooseMonthlyInstallmentsLocator)
      .should("exist")
      .and("not.be.disabled")
      .select(months[installment]);
  }

  clickConfirmButton() {
    return cy.get(this.confirmBtnOnPaymentTabLocator).click();
  }
}
