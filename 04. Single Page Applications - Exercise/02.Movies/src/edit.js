const section = document.getElementById('edit-movie');

section.remove();
let ctx = null;

export function showEdit(inCtx) {
    ctx = inCtx;
    ctx.render(section);
}