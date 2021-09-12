import * as submissionsPage from "../../page-objects/submissions-page";
import * as FacetFiltersApiCalls from "../api-tests/filter-facets.test";
import * as SubmissionsFiltersApiCalls from "../api-tests/filter-submissions-api.test";

//I will be using applitools eyes for visual tests, to run this for yourself you need to create 
//An applitools account get an applitools api key and run this command for the project in your terminal
//export APPLITOOLS_API_KEY={{YourAPIKey}} 
describe('Consists of all the automated tests under the Event landing page (overview) Module On the Regression sheet', () => {

    beforeEach( () => {
        submissionsPage.navigate();

        cy.log('Open applitools eyes to help with visual validation');
        cy.eyesOpen({
            appName: 'Morressier Tests', batchName: 'New Batch'
        });
    });

    afterEach(() => {
        cy.eyesClose();
    })

    
    it("To ensure that the user can open the conference page as a visitor ", () => {
        //this helps take a screenshot of the page using applitools eyes and helps analyse the screenshot with a benchmark screenshot saved 
        cy.eyesCheckWindow('Check that landing page works and everything that needs to be displayed is displayed ');

        cy.log('Check that The Event Name exists')
        cy.getTextCheckIfTextExists("ACS Spring 2020 National Meeting & Expo");

        cy.log('Check that the morressier logo and Icon are returned');
        submissionsPage.getImage('Morressier Logo').should('exist');
        submissionsPage.getImage('Morressier Icon').should('exist');


    });

    it('To ensure that the conference information is displayed correctly on the page after the page is loaded', () => {
        cy.log('Check that the conference image is returned');
        submissionsPage.getImage('user avatar').should('exist');

        //Check conference Topic
        cy.log('Check the conference topic');
        cy.getTextCheckIfTextExists('Macromolecular Chemistry: The Second Century');
        
        //Check for conference host
        cy.log('Check the conference host');
        cy.getTextCheckIfTextExists('American Chemical Society');

        cy.log('Check the links on the conference page');
        //verify the links on the conference page
        cy
            .verifyLink('acs.org', 'https://www.acs.org/content/acs/en/meetings/national-meeting/registration/attendees/coronavirus-faq.html');

        cy
            .verifyLink('Author Benefits', 'https://scimeetings.acs.org/?utm_source=pubs_content_marketing&utm_medium=website&utm_campaign=0320_MCF_NPI_Launch_Spring_Homepage&ref=pubs_content_marketing');

        cy
            .verifyLink('How to use SciMeetings', 'https://storage.googleapis.com/dl.morressier.com/acs/SciMeetings-ACSSpring2020-HowToGuide_M3020-Final.pdf');

        cy
            .verifyLink('Frequently Asked Questions', 'https://storage.googleapis.com/dl.morressier.com/acs/SciMtng_ACSNMSp2020_FAQ_M3120_Final.pdf');
    });

    //it("Visual Test for the filters view", () => {

      //  submissionsPage.clickFilterButton();
        
        //cy.eyesCheckWindow('Check that the filters page looks as it should ');
    //});

    it('To ensure that the cookie notification banner disappears after the user clicks on the "Got it" button', () => {
        cy.log('Check that the cookieBannerDismissed cookie does not exist when user first visits the site');
        cy.getCookie('cookieBannerDismissed').should('not.exist');

        submissionsPage.checkThatCookieBannerIsDisplayed();

        //click on the close ccookie banner button
        cy.clickButton("Got it");

        submissionsPage.checkThatCookieBannerIsNotDisplayed();

        cy.getCookie('cookieBannerDismissed').should('exist');
        cy.getCookie('cookieBannerDismissed').should('have.property','value',"true");

        
        
    });

    it('To ensure that the user does not see the cookie notification banner again if he visits the. page again on the same browser for the same device', () => {
        cy.getCookie('cookieBannerDismissed').should('not.exist');

        cy.setCookie("cookieBannerDismissed", "true");
        cy.getCookie('cookieBannerDismissed').should('have.property','value',"true");

        cy.reload();

        submissionsPage.checkThatCookieBannerIsNotDisplayed(); 
    });

    it.only('To ensure that user can See the search field and an Add filter button on the page', () => {
        submissionsPage.findElementWithPlaceholder('Search').should('exist');

        cy.findButton('Add filter').should('exist');


    });

    


});

describe('Consists of all the automated tests under the submissions list with search & filtering Module on the regression sheet' , () => {

    beforeEach( () => {
        submissionsPage.navigate();

        //Remove the cookie notification banner
        cy.clickButton("Got it");

        cy.eyesOpen({
            appName: 'Morressier Test', batchName: 'Test Submissions'
        });
    });

    afterEach(() => {
        cy.eyesClose();
    })

    it("Check to make sure that user can open all filter groups and see all the filter values in a group", () => {
        
        var queryParamsforFacetEndpoint = {
            type: "event_posters",
            ref_id: "5e733c5acde2b641284a7e27",
            facet_name:"keywords",
            facet_value:""
        };

        
        FacetFiltersApiCalls.interceptFacetsApiCall("event_posters", "5e733c5acde2b641284a7e27","keywords","");
        FacetFiltersApiCalls.interceptFacetsApiCall("event_posters", "5e733c5acde2b641284a7e27","author_names","");
        FacetFiltersApiCalls.interceptFacetsApiCall("event_posters", "5e733c5acde2b641284a7e27","author_organizations","");
        FacetFiltersApiCalls.interceptFacetsApiCall("event_posters", "5e733c5acde2b641284a7e27","division","");
        FacetFiltersApiCalls.interceptFacetsApiCall("event_posters", "5e733c5acde2b641284a7e27","symposia","");
        FacetFiltersApiCalls.interceptFacetsApiCall("event_posters", "5e733c5acde2b641284a7e27","session","");
        
        submissionsPage.clickFilterButton();

        

        var keywords = FacetFiltersApiCalls.waitForFacetsApisGetFacetsHits("keywords");
        var author_names = FacetFiltersApiCalls.waitForFacetsApisGetFacetsHits("author_names");
        var author_organizations = FacetFiltersApiCalls.waitForFacetsApisGetFacetsHits("author_organizations");
        var division = FacetFiltersApiCalls.waitForFacetsApisGetFacetsHits("division");
        var symposia = FacetFiltersApiCalls.waitForFacetsApisGetFacetsHits("symposia");
        var session = FacetFiltersApiCalls.waitForFacetsApisGetFacetsHits("session");

       


        //try to open all the filter groups
        //cy.clickATextValue("Keywords");
        cy.clickATextValue("Author names");
        cy.clickATextValue("Organizations");
        cy.clickATextValue("division");
        cy.clickATextValue("session");

        submissionsPage.getFilterAllFiltersForFilterGroup("Keywords");


        


        
    });
});