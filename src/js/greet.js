const greeter = className => {
    const el = document.createElement('div');
    el.classList.add('greet');
    el.textContent = 'Hello PopSchool !';
    document.body.appendChild(el);
};

export default greeter;
