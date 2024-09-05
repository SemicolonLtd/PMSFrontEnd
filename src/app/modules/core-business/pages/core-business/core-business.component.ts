import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CoreBusinessService } from '../../services/core-business.service';

@Component({
    selector: 'app-core-business',
    templateUrl: './core-business.component.html',
    styleUrls: ['./core-business.component.scss']
})
export class CoreBusinessComponent implements OnInit, OnDestroy {

    //   coreList = [
    //     {
    //         "title": "Offshore Construction",
    //         "slug": "testasdsa",
    //         "pref": "It is a long established fact that a reader will be distracted by the of readable content of page  lookings at its layouts  points.",
    //         "image": "assets/images/home/core-front.webp",
    //         "business": [
    //             {
    //                 "name": "testaaaa",
    //                 "slug": "testaaaa",
    //                 "iconUrl": null,
    //                 "imageUrl": "http://localhost/pms/public/upload/image/cover_39c0df29182e495f7c04a30a5400d2ba.jpg",
    //                 "desc": "<p>tsatsatsat s sat&nbsp;</p>",
    //                 "pref": "teastt",
    //                 "core_id": 1,
    //                 "cate_name": "testasdsa"
    //             },
    //             {
    //                 "name": "tesat",
    //                 "slug": "tesat",
    //                 "iconUrl": null,
    //                 "imageUrl": "http://localhost/pms/public/upload/image/cover_c8a068a9f4b65cd78db430a937f3c979.jpg",
    //                 "desc": "<p>wqewqewqeqwe</p>",
    //                 "pref": "ttttqtwqt",
    //                 "core_id": 1,
    //                 "cate_name": "testasdsa"
    //             },
    //             {
    //                 "name": "test3",
    //                 "slug": "test3",
    //                 "iconUrl": null,
    //                 "imageUrl": "http://localhost/pms/public/upload/image/cover_1fdb6c7dd8a7389743264bcb9e994769.jpg",
    //                 "desc": "<p>dasdasdasfsafsafsad</p>",
    //                 "pref": "fafqfwfwqewqewqsa",
    //                 "core_id": 1,
    //                 "cate_name": "testasdsa"
    //             },
    //             {
    //                 "name": "test 1",
    //                 "slug": "test-1",
    //                 "iconUrl": "http://localhost/pms/public/upload/image/core_aa97857610200b3aabaadb296a42f04e.png",
    //                 "imageUrl": "http://localhost/pms/public/upload/image/cover_aa97857610200b3aabaadb296a42f04e.jpg",
    //                 "desc": "<p>test11ttq</p>",
    //                 "pref": "test 1t",
    //                 "core_id": 1,
    //                 "cate_name": "testasdsa"
    //             },
    //             {
    //                 "name": "tttqtqtq",
    //                 "slug": "tttqtqtq",
    //                 "iconUrl": "http://localhost/pms/public/upload/image/core_46fd1cda56ff02e4f0f83c1cb8f33b30.png",
    //                 "imageUrl": "http://localhost/pms/public/upload/image/cover_46fd1cda56ff02e4f0f83c1cb8f33b30.png",
    //                 "desc": "<p>wqewqewqewqe</p>",
    //                 "pref": "tqwtqwtwqtwq",
    //                 "core_id": 1,
    //                 "cate_name": "testasdsa"
    //             }
    //         ]
    //     },
    //     {
    //         "title": "Marine Services",
    //         "slug": "testasdsa",
    //         "pref": "It is a long established fact that a reader will be distracted by the of readable content of page  lookings at its layouts  points.",
    //         "image": "assets/images/home/core-front.webp",
    //         "business": [
    //             {
    //                 "name": "testaaaa",
    //                 "slug": "testaaaa",
    //                 "iconUrl": null,
    //                 "imageUrl": "http://localhost/pms/public/upload/image/cover_39c0df29182e495f7c04a30a5400d2ba.jpg",
    //                 "desc": "<p>tsatsatsat s sat&nbsp;</p>",
    //                 "pref": "teastt",
    //                 "core_id": 1,
    //                 "cate_name": "testasdsa"
    //             },
    //             {
    //                 "name": "tesat",
    //                 "slug": "tesat",
    //                 "iconUrl": null,
    //                 "imageUrl": "http://localhost/pms/public/upload/image/cover_c8a068a9f4b65cd78db430a937f3c979.jpg",
    //                 "desc": "<p>wqewqewqeqwe</p>",
    //                 "pref": "ttttqtwqt",
    //                 "core_id": 1,
    //                 "cate_name": "testasdsa"
    //             },
    //             {
    //                 "name": "test3",
    //                 "slug": "test3",
    //                 "iconUrl": null,
    //                 "imageUrl": "http://localhost/pms/public/upload/image/cover_1fdb6c7dd8a7389743264bcb9e994769.jpg",
    //                 "desc": "<p>dasdasdasfsafsafsad</p>",
    //                 "pref": "fafqfwfwqewqewqsa",
    //                 "core_id": 1,
    //                 "cate_name": "testasdsa"
    //             },
    //             {
    //                 "name": "test 1",
    //                 "slug": "test-1",
    //                 "iconUrl": "http://localhost/pms/public/upload/image/core_aa97857610200b3aabaadb296a42f04e.png",
    //                 "imageUrl": "http://localhost/pms/public/upload/image/cover_aa97857610200b3aabaadb296a42f04e.jpg",
    //                 "desc": "<p>test11ttq</p>",
    //                 "pref": "test 1t",
    //                 "core_id": 1,
    //                 "cate_name": "testasdsa"
    //             },
    //             {
    //                 "name": "tttqtqtq",
    //                 "slug": "tttqtqtq",
    //                 "iconUrl": "http://localhost/pms/public/upload/image/core_46fd1cda56ff02e4f0f83c1cb8f33b30.png",
    //                 "imageUrl": "http://localhost/pms/public/upload/image/cover_46fd1cda56ff02e4f0f83c1cb8f33b30.png",
    //                 "desc": "<p>wqewqewqewqe</p>",
    //                 "pref": "tqwtqwtwqtwq",
    //                 "core_id": 1,
    //                 "cate_name": "testasdsa"
    //             }
    //         ]
    //     }
    //   ]

    coreList: any[] = [];
    loading = false;
    subscription = new Subscription();

    constructor(
        private coreBusinessService: CoreBusinessService
    ) { }

    ngOnInit(): void {
        this.getCoreList();
    }

    getCoreList(): void {
        this.loading = true;
        this.subscription.add(
            this.coreBusinessService.getCoreBusinessMenus().subscribe({
                next: (res: any) => {
                    if (res?.status == 200) {
                        this.coreList = res?.data?.data;
                        this.loading = false;
                    }
                },
                error: (err: any) => {
                    this.loading = false;
                }
            })
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

}
