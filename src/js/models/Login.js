import {API_VALUES as api} from './../config'
import {getUserData as getFB, writeUserData as writeFB} from './../firebaseConnection'

export default class Login {
    constructor (username, password) {
        this.username = username;
        this.password = password;
    }

    async getLoginResult() {
        const usuario = await getFB(this.username);

        if (!usuario){
            addLoginData(this.username, this.password);
            return true;
        } else {
            return usuario.password===this.password;
        }
    }
}

const addLoginData = (user, pass) => {
    writeFB(user, pass);
};