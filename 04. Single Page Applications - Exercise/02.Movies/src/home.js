const section = document.getElementById('home-page');
section.remove();

export function showHome(ctx) {
    ctx.render(section);
}