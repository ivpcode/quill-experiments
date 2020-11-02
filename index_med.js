import 'purecss/build/pure-min.css'

import './index.scss'
import $ from "cash-dom"

import MediumEditor from 'medium-editor'
import 'medium-editor/dist/css/medium-editor.min.css'
import './toolbar.scss'

$(document).ready (()=> {

    let vEls = document.querySelectorAll(".ql-edit-field");

    for(let i=0;i<vEls.length;i++){
        let editor = new MediumEditor(vEls[i],{
            toolbar: { buttons: ['bold', 'italic', 'underline'], static: true, align:'left', sticky:true },
            autoLink: true,
            targetBlank: true,
            paste: {
                forcePlainText: false,
                cleanPastedHTML: true,
                cleanTags: [],
                unwrapTags: [ 'h1','h2','h3','h4','h5','h6','div','span','em','sup','code','li','ul','button','table','hr','tr','td' ],
                cleanReplacements: [
                    [new RegExp(/<p/ig), '<br'],
                ]
            },
        })

        vEls[i].editor_hinstance = editor;

        //vEls[i].editor_hinstance = new CtvInputTextEditor(vEls[i]);
    }

    let btn = document.getElementById("BUTTON");
    btn.addEventListener("click", () => {
        let sHtml = "";
        for(let i=0;i<vEls.length;i++){
            sHtml += vEls[i].editor_hinstance.getContent().replace(/\<p\>/ig,'<br>').replace(/\<\/p\>/ig,'');

            //sHtml += vEls[i].editor_hinstance.GetContents();


        }
        //vEls[i].editor_hinstance.Destroy()
        document.getElementById("OUTPUT").innerHTML = sHtml;
    })
});

