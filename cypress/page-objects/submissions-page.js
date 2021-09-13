import {recurse} from 'cypress-recurse'
import * as SubmissionsFiltersApiCalls from "../api-intercepts/filter-submissions-api";


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
    cy.clickATextValue('Clear all filters');
}

export function searchUsingTheSearchField(placeholderValue,searchTerm){
    cy.get('form').eq(1).findByPlaceholderText(placeholderValue).type(`${searchTerm}{enter}`, {force: true});
}

export function findElementWithPlaceholder(placeholderValue){

    return cy.get('form').findByPlaceholderText(placeholderValue);
}

export function getImage(imageRoleName){
    return cy.findByRole('img', { name: `${imageRoleName}` });
}

export function checkIfFilterGroupValuesAreDisplayed(filterGroupName, expectedNumberOfFilterValuesPlusTheShowMoreButton){

    //The result of this is all the filter values under the filter group and the show 10 more button
    cy.findAllByRole('heading', {name: filterGroupName}).parent().parent().siblings().within(() => {
                cy.findAllByRole('button', {role: "button"}).should('have.length', expectedNumberOfFilterValuesPlusTheShowMoreButton);
    });
}

export function checkEachFilterValueIsCorrectAfterUserClicksTheShowMoreButton(filterGroupName, filterValue, i, size){
    cy.findAllByRole('heading', {name: filterGroupName}).parent().parent().siblings().within(() => {
                cy.findAllByRole('button', {role: "button"}).should('have.length', size).eq(i).should('contain.text', filterValue);
    });
}

export function compareFilterValueResultsFromTheApiWithTheResultsOnTheUi(filterGroupName, i, filterName){
    cy.findAllByRole('heading', {name: filterGroupName}).parent().parent().siblings().within(() => {
        cy.findAllByRole('button', {role: "button"}).eq(i).should('contain.text', filterName);
    });
}

export function clickOnFilterCheckboxWithFilterText(filterGroupName, filterName){

    cy.findAllByRole('heading', {name: filterGroupName}).parent().parent().siblings().within(() => {
                cy.clickATextValue(filterName);
    });
}

export function clickOnTheShowMoreFilterButtonForAFilterGroup(howManyToBeDisplayed){

    //getNumberFromFacetApi
    //getPresentDisplayedValueNumber
    //get
    cy.findAllByRole('heading', {name: filterGroupName}).parent().parent().siblings().within(() => {
        cy.clickATextValue(`Show ${howManyToBeDisplayed} more`);
    });
}

export function checkIfFilterValueIsChecked(filterGroupName, filterName){
    cy.findAllByRole('heading', {name: filterGroupName}).parent().parent().siblings().within(() => {
        cy.findByText(filterName).siblings().first().within(() => {
            cy.get('[type="checkbox"]').should('be.checked');
        });
    });
}


/* export function traverseFromPageOneToTheLastPage(){
    var pages = 1;
        recurse(
            () => cy.findButton('Next'),
            ($next) => !($next.is(":hidden")),
            {  
            
                limit: 50, // max number of iterations
                timeout: 30000,
                
                post(){

                        SubmissionsFiltersApiCalls.interceptQuerySearchApiCall("rent", "5e733c5acde2b641284a7e27", (24*pages),24);
                        cy.wait(3000);
                        cy.findButton('Next').click(); 
                        SubmissionsFiltersApiCalls.waitForQuerySearchApi("rent");

                        pages++;
                        //cy.findButton('Next').should('not.exist')
                }
            }
        );
    
    
}


export function traverseFromLastPageToPageOne(){
    recurse(
        () => cy.findButton('Previous'),
        ($next) => $next.should('not.exist'),
        {    

            post(){
                cy.findButton('Previous').click();  
            }

        }
        
    );
} */