import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

    constructor() { 
        console.log(document.getElementById('loaderid'))
    }

    showLoader() {
        if (document && document.getElementById('loaderid')) {
            document.getElementById('loaderid').style.display = 'flex';
        }
    }

    hideLoader() {
        if (document && document.getElementById('loaderid')) {
            document.getElementById('loaderid').style.display = 'none';
        }
    }

}
