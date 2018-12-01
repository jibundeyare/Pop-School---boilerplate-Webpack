const greeter = className => {
    const el = document.createElement('div');
    el.classList.add('greet');
    el.textContent = 'Hello Popschool !';
    document.body.appendChild(el);
};

export default greeter;
