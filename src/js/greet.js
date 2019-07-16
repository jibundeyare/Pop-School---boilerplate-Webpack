const greeter = className => {
    const el = document.createElement('div');
    el.classList.add('greet');
    el.textContent = 'Hello loicpennequin/Pop-School---boilerplate-Webpack!';
    document.body.appendChild(el);
};

export default greeter;
