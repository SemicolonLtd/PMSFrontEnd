import { inject } from '@angular/core';
import { DefaultUrlSerializer, Router, UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';

export class LanguageUrlSerializer extends DefaultUrlSerializer {

    // lang = environment.lang;
    override parse(url: string): UrlTree {
        // Parse the URL and handle the language parameter
        const urlTree = super.parse(url);
        const lang = urlTree.queryParams['lang'] || environment.lang; // Default language is 'en'
        
        urlTree.queryParams['lang'] = lang;
        environment.lang = lang;
        return urlTree;
    }

    override serialize(tree: UrlTree): string {
        // Serialize the URL and include the language parameter
        const url = super.serialize(tree);
        // console.log(url);
        // console.log(tree.queryParams)
        
        const lang = tree.queryParams['lang'] ? tree.queryParams['lang'] : environment.lang;
        return url.includes('lang=') ? url : `${url}?lang=${lang}`;
    }
}
