
var queryParamsforSubmissionsFilterEndpointDefault = {
    offset: 0,
    limit: 24,
    public_access_enabled: true
};

var queryParamsforSubmissionsWithAllFilters = {
    offset: "",
    limit: "",
    filter_author_names: "",
    filter_author_organizations : "",
    filter_division: "",
    filter_keywords: "",
    filter_session: "",
    public_access_enabled: true
};

var queryParamsforSubmissionsWithAllFiltersAndQuery = {
    offset: "",
    limit: "",
    filter_author_names: "",
    filter_author_organizations : "",
    filter_division: "",
    filter_keywords: "",
    filter_session: "",
    public_access_enabled: true,
    query: ""
};

var queryParamsforSubmissionsFilterWithAuthorNamesAlone = {
    offset: "",
    limit: "",
    filter_author_names: "",
    public_access_enabled: true
};

var queryParamsforSubmissionsFilterWithAuthorOrganizationAlone = {
    offset: "",
    limit: "",
    filter_author_organizations: "",
    public_access_enabled: true
};

var queryParamsforSubmissionsFilterKeywordsAlone = {
    offset: "",
    limit: "",
    filter_author_organizations: "",
    public_access_enabled: true
};







function submissionRequest(conferenceRefId, queryParamsforSubmissionsFilterEndpoint){
    
    return cy.request({
        url: `api/v1/discovery/events/${conferenceRefId}/posters/filter-search`,
        method: "GET",
        qs: queryParamsforSubmissionsFilterEndpoint
      });


} 

export function interceptQuerySearchApiCall(query, ref_id, offset,limit){
  
      //intercept and wait for request
      cy.intercept(
        `https://www.morressier.com/api/v1/discovery/events/${ref_id}/posters/filter-search?offset=${offset}&limit=${limit}&query=${query}`).as(`${query}`);
  }
  
  export function waitForQuerySearchApi(query){
    cy.wait(`@${query}`)
              .then(({response}) => {
              console.log(response.statusCode)
              expect(response.statusCode).to.eq(200);
    });


//"https://www.morressier.com/api/v1/discovery/events/5e733c5acde2b641284a7e27/posters/filter-search?offset=48&limit=24&query=rent"

  }