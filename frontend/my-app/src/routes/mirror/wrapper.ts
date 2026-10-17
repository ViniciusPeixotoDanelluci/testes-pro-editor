
import { EditorSelection } from '@codemirror/state'
import { keymap } from '@codemirror/view'
import type { EditorView } from '@codemirror/view'

function wrapSelectionMirror(view: EditorView, prefix: string, suffix: string): boolean {
    // changeByRange itera sobre todas as seleções (mesmo que haja múltiplos cursores)
    
    const changes = view.state.changeByRange(range => {
        // Pega o texto que está selecionado naquele cursor
        const selectedtext = view.state.sliceDoc(range.from, range.to);
        return {
            // Define o que será inserido e onde
            changes: { 
                from: range.from, 
                to: range.to, 
                insert: prefix + selectedtext + suffix 
            },
            // Reposiciona o cursor ou a seleção para o meio dos novos caracteres
            range: EditorSelection.range(
                range.from + prefix.length, 
                range.to + prefix.length
            )
        };
    });

    // Aplica as mudanças no editor e atualiza a seleção
    view.dispatch({
        changes: changes.changes,
        selection: changes.range
    })
    return true
}

export const markdownKeybindings = keymap.of([
    {
        key: 'Mod-b', // "Mod" é Ctrl no Windows/Linux e Cmd no Mac
        run: (view) => wrapSelectionMirror(view, '**', '**'),
        preventDefault: true
    },
    {
        key: '*', // Ctrl+*
        run: (view) => wrapSelectionMirror(view, '*', '*'),
        preventDefault: true
    },
        {
        key: '"', // Ctrl+"
        run: (view) => wrapSelectionMirror(view, '"', '"'),
        preventDefault: true
    },
    {
        key: 'Mod-e', // Ctrl+E
        run: (view) => wrapSelectionMirror(view, '`', '`'),
        preventDefault: true
    }
    //Revisar esse código depois que eu fiz com IA já que ninguém na internet queria me responder
]);