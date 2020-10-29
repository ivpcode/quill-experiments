import 'purecss/build/pure-min.css'
import 'quill/dist/quill.bubble.css'

import './index.scss'
import Quill from "quill"
import { QuillDeltaToHtmlConverter} from 'quill-delta-to-html'
import $ from "cash-dom"

$(document).ready (()=> {
    let Delta = Quill.import('delta');
    var Clipboard = Quill.import('modules/clipboard');

    class PlainClipboard extends Clipboard {
        onPaste (e) {
            e.preventDefault()
            const range = this.quill.getSelection()
            const text = e.clipboardData.getData('text/plain')
            const delta = new Delta()
                .retain(range.index)
                .delete(range.length)
                .insert(text)
            const index = text.length + range.index
            const length = 0
            this.quill.updateContents(delta, 'silent')
            this.quill.setSelection(index, length, 'silent')
            this.quill.scrollIntoView()
        }
    }

    Quill.register('modules/clipboard', PlainClipboard, true);

    let vEls = document.querySelectorAll(".ql-edit-field");

    for(let i=0;i<vEls.length;i++){
        let editor = new Quill(vEls[i],{
                theme: 'bubble',

                modules: {
                    toolbar: ['bold', 'italic', 'underline', 'link'],
                }
        })

        vEls[i].editor_hinstance = editor;
    }

    let btn = document.getElementById("BUTTON");
    btn.addEventListener("click", () => {
        let sHtml = "";
        for(let i=0;i<vEls.length;i++){
            let cnt = vEls[i].editor_hinstance.getContents();
            let converter = (new QuillDeltaToHtmlConverter(cnt.ops, {paragraphTag:'br',linkTarget:'_blank'}));
            sHtml += converter.convert();
        }

        document.getElementById("OUTPUT").innerHTML = sHtml;
    })
});

