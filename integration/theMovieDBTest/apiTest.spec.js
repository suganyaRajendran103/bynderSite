/// <reference types="cypress" />

context('The Movie DB Site - API Testing', () => {
    describe('Rating API response check()', () => {
        beforeEach( () => {
            cy.log('starting test')
          })
          
        it('Happy Path - GET method', () => {
            cy.request({
                method : 'GET', 
                url : 'https://api.themoviedb.org/3/movie/550?api_key=f3721ae3e1632a6297050b259a0473f2'
            }).then((response) => {
                cy.log(response)
                expect(response.status).to.eq(200)
            })
        })
        it('Happy Path - GET call Top rated', () => {
            cy.visit('https://developers.themoviedb.org/3/movies/get-top-rated-movies')
            cy.request({
                method : 'GET', 
                url : 'https://api.themoviedb.org/3/movie/top_rated?api_key=f3721ae3e1632a6297050b259a0473f2&language=en-US&page=1',
                headers : {
                    'authorization' : 'Bearer f3721ae3e1632a6297050b259a0473f2',
                    'cache-Control' : 'no-cache'
                }
            }).then((response) => {
                cy.log(response)
                expect(response.status).to.eq(200)
            })
            
        })

        it('POST - API test', () => {
            cy.visit('https://developers.themoviedb.org/3/movies/rate-movie')
            cy.request('POST', '/movie/{movie_id}/rating')
            .then((response) => {
                cy.log(response)
                expect(response.status).to.eq(200)
            })
            
        })

        
    })
})