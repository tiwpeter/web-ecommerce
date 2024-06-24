function setView(view) {
    const itemsContainer = document.getElementById('productList');
    if (view === 'grid') {
        itemsContainer.classList.remove('list-view');
        itemsContainer.classList.add('grid-view');
    } else if (view === 'list') {
        itemsContainer.classList.remove('grid-view');
        itemsContainer.classList.add('list-view');
    }
}
