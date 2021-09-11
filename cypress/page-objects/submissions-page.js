export function navigate() {
    cy.visit('event/5e733c5acde2b641284a7e27');
}

export function clickFilterButton(){
    try {
        cy.clickButton("Add filter");
    } catch (error) {
        cy.clickButton("Filters");
    }
}

export function checkThatCookieBannerIsDisplayed(){
    cy.getTextCheckIfTextExists("We use cookies to ensure that we give you the best experience on our website");    
    cy.verifyLink("Learn more", "/privacy-policy");
}

export function checkThatCookieBannerIsNotDisplayed(){
    cy.getTextCheckIfTextDoesNotExists("We use cookies to ensure that we give you the best experience on our website");
}

export function closeAddFiltersSideMenu(){
    cy.getTextCheckIfTextExists("Presentation filters");
    cy.clickButton("Close");
    cy.getTextCheckIfTextDoesNotExists("Presentation filters");
}

export function clearAllFilters(){

}

export function getFilterAllFiltersForFilterGroup(filterGroupName){

    cy.findAllByRole('heading', {name: filterGroupName}).parent().parent().siblings().within(() => {
                cy.findAllByRole('button', {role: "button"}).should('have.length', 11);
            })
}


//for checkbox findByRole('checkbox', { checked: true })