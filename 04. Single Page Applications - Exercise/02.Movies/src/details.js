const section = document.getElementById('movie-example');

section.remove();
let ctx = null;

export function showDetails(inCtx) {
    ctx = inCtx;
    ctx.render(section);
}