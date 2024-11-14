export function nameValidate(name: string) : boolean {
    const re = /^[a-zA-Z\s]+$/;
    return re.test(name);
}

export function telValidate(tel: string) : boolean {
    const re = /^[0-9]{10}$/;
    return re.test(tel);
}

export function emailValidate(email: string) : boolean {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

export function passwordValidate(password: string) : boolean {
    return password.length >= 8;
}
