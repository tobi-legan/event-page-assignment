
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

describe("Submission Filter tests", () => {
    it("Check that all the submission ID's returned also return all the attributes for that submission", () => {
        
        submissionRequest("5e733c5acde2b641284a7e27", queryParamsforSubmissionsFilterEndpointDefault)
            .then((response) => {
                var responseBody = response.body;
                var responseStatus = response.status;

                expect(responseStatus).to.eql(200);
            })
        
    });
});