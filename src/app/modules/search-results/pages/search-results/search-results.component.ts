import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

    // searchResults = {
    //     "news": {
    //         "data": [],
    //         "links": null,
    //         "meta": {
    //             "pagination": {
    //                 "total": 0,
    //                 "count": 0,
    //                 "per_page": 1,
    //                 "current_page": 1,
    //                 "total_pages": 1
    //             }
    //         }
    //     },
    //     "projects": {
    //         "data": [
    //             {
    //                 "slug": "test",
    //                 "title": "test",
    //                 "desc": "<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; test 11111<br />\r\n&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; test 11111&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; test 11111<br />\r\n&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; test 11111<br />\r\n&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; test 11111<br />\r\n&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; test 11111<br />\r\n&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; test 11111</p>\r\n\r\n<p>test1 en&nbsp;test1 en&nbsp;test1 en1111111111<br />\r\ntest1 en&nbsp;test1 en&nbsp;test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111test1 en test1 en test1 en1111111111test1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111test1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111</p>\r\n\r\n<p>test1 en&nbsp;test1 en&nbsp;test1 en1111111111<br />\r\ntest1 en&nbsp;test1 en&nbsp;test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111test1 en test1 en test1 en1111111111test1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111test1 en test1 en test1 en1111111111<br />\r\ntest1 en test1 en test1 en1111111111</p>",
    //                 "start_date": "2024-09-02",
    //                 "end_date": null,
    //                 "location": null,
    //                 "country": "egypt",
    //                 "client": null,
    //                 "short": "test 11111",
    //                 "type": "recent-projects",
    //                 "image": "http://localhost/pms/public/upload/image/slider_ca7c912d5cf4ed6ae4f2101c702e4a9c.png",
    //                 "core_bussiness": [
    //                     {
    //                         "name": "test 1",
    //                         "pref": "test 1t",
    //                         "icon": "http://localhost/pms/public/upload/image/core_aa97857610200b3aabaadb296a42f04e.png",
    //                         "slug": "test-1"
    //                     },
    //                     {
    //                         "name": "test3",
    //                         "pref": "fafqfwfwqewqewqsa",
    //                         "icon": null,
    //                         "slug": "test3"
    //                     }
    //                 ],
    //                 "media": [
    //                     {
    //                         "image": "http://localhost/pms/public/upload/image/news_039f0d8dadecea90e36453648aab7bb12.png"
    //                     },
    //                     {
    //                         "image": "http://localhost/pms/public/upload/image/news_05e79b5a577b540eedcf7684bb7e46019.jpg"
    //                     },
    //                     {
    //                         "image": "http://localhost/pms/public/upload/image/news_13e138292f11fe3eb0d8d9e3c39b1527b.png"
    //                     }
    //                 ]
    //             }
    //         ],
    //         "links": null,
    //         "meta": {
    //             "pagination": {
    //                 "total": 1,
    //                 "count": 1,
    //                 "per_page": 1,
    //                 "current_page": 1,
    //                 "total_pages": 1
    //             }
    //         }
    //     },
    //     "events": {
    //         "data": [],
    //         "links": null,
    //         "meta": {
    //             "pagination": {
    //                 "total": 0,
    //                 "count": 0,
    //                 "per_page": 1,
    //                 "current_page": 1,
    //                 "total_pages": 1
    //             }
    //         }
    //     },
    //     "pages": {
    //         "data": [
    //             {
    //                 "title": "test one",
    //                 "slug": "test-one",
    //                 "tags": "test",
    //                 "body": "<p>tsa asd as tgefasd fasf asf asf asf asf asffsaf</p>",
    //                 "image": "http://localhost/pms/public/upload/image/page_42eb0a59fb13505dad41e3c5e756e027.jpg"
    //             }
    //         ]
    //     },
    //     "coreBusiness": {
    //         "data": [
    //             {
    //                 "name": "test3",
    //                 "slug": "test3",
    //                 "iconUrl": null,
    //                 "imageUrl": "http://localhost/pms/public/upload/image/cover_1fdb6c7dd8a7389743264bcb9e994769.jpg",
    //                 "desc": "<p>dasdasdasfsafsafsad</p>",
    //                 "pref": "fafqfwfwqewqewqsa",
    //                 "core_id": 1,
    //                 "cate_name": "testasdsa",
    //                 "media": []
    //             }
    //         ],
    //         "links": "http://localhost/pms/public/pms/api/search/test/1?page=2",
    //         "meta": {
    //             "pagination": {
    //                 "total": 3,
    //                 "count": 1,
    //                 "per_page": 1,
    //                 "current_page": 1,
    //                 "total_pages": 3
    //             }
    //         }
    //     }
    // }
    searchResults: any = {};
    loading = false;
    pageSize = 1000;
    searchQuery = '';
    subscriptions = new Subscription();

    constructor(
        private searchService: SearchService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
       this.getSearchQueryFromParams();
    }

    getSearchQueryFromParams(): void {
        this.subscriptions.add(
            this.route.queryParams.subscribe(params => {
                console.log(params);
                this.searchQuery = params['query'] || '';
                this.getSearchResults();
            })
        );
    }

    getSearchResults(): void {
        this.loading = true;
        this.subscriptions.add(
            this.searchService.search(this.searchQuery, this.pageSize).subscribe({
                next: (res: any) => {
                    if(res?.status == 200) {
                        this.searchResults = res?.data;
                        this.loading = false;
                    }
                },
                error: () => {
                    this.loading = false;
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
}
