
var queryParamsforFacetEndpoint = {
    type: "event_posters",
    ref_id: "5e733c5acde2b641284a7e27",
    facet_name:"",
    facet_value:""
};

export function facetsRequestServerResponse(queryParamsforFacetEndpoint, facet_name, facet_value){
    
    queryParamsforFacetEndpoint.facet_name = facet_name;
    queryParamsforFacetEndpoint.facet_value = facet_value;


        return cy.request({
            url: 'api/v3/discovery/filter-config/facet-search',
            method: "GET",
            qs: queryParamsforFacetEndpoint
          });
    

} 

export function interceptFacetsApiCall(type, ref_id, facet_name, facet_value){
  queryParamsforFacetEndpoint.facet_name = facet_name;
  queryParamsforFacetEndpoint.facet_value = facet_value;

    //intercept and wait for request
    cy.intercept(
      `https://www.morressier.com/api/v3/discovery/filter-config/facet-search?type=${type}&ref_id=${ref_id}&facet_name=${facet_name}&facet_term=${facet_value}`).as(`${facet_name}`);
}

export function waitForFacetsApisGetFacetsHits(facet_name){
  cy.wait(`@${facet_name}`)
            .then(({response}) => {
            console.log(response.statusCode)
            expect(response.statusCode).to.eq(200);
            return response.body.facetHits;
  });
}

/*
$.extend(true, skillet.person, {
  name: {
    first: 'updated'
  },
  birthday: {
    day: 'updated',
    year: 'updated'
  }
});

myDog.name = "Happy Coder";
*/ 

function FacetRequestInterceptResponse(conferenceRefId, queryParamsforSubmissionsFilterEndpoint, fixtureFile){

}