import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
const API_URL="https://localhost:7238/"
const SERVER_URL="http://127.0.0.1:5500"
createApp({
data() {
    return {
    title:"USER MANAGEMENT",
    users:[],
    editUserId:-1,
    deleteUsers:[]
    }
},
    methods:{
    showAddUser(){
        var x = document.getElementById("addUserDiv");
        x.style.display = "block";
    },
    addOrRemoveDeleteUser(userid){
        if(this.deleteUsers.includes(userid)){
        const index = this.deleteUsers.indexOf(userid);
        if (index > -1) {
            this.deleteUsers.splice(index, 1);
        }
        }
        else this.deleteUsers.push(userid);
    },
    cancelAddNewUser(){
        var x = document.getElementById("addUserDiv");
        x.style.display = "none";
    },
    cancelEditUser(){
        var x = document.getElementById("editUserDiv");
        x.style.display = "none";
    },
    async refreshData(){
        axios.get(API_URL+"api/Users", {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  "'"+SERVER_URL+"'"
        }
        }).then(
            (response)=>{
                this.users=response.data;
            }
        )
    },
    async addNewUser(){
        var firstname = document.getElementById("addfirstname").value;
        var lastname = document.getElementById("addlastname").value;
        var email = document.getElementById("addemail").value;
        var phone  = document.getElementById("addphone").value;
        var gender = document.getElementById("addgender").value;
        var dateOfBirth = document.getElementById("adddateOfBirth").value;
        var nationality = document.getElementById("addnationality").value;
        var role = document.getElementById("addrole").value;

        const formData = new FormData();
        formData.append("firstName", firstname);
        formData.append("lastName", lastname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("nationality", nationality);
        formData.append("role", role);

        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);

        axios.post(API_URL+"api/Users", json, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "'"+SERVER_URL+"'"
        }
        }).then(
        (response)=>{
            this.refreshData();
            alert(response.data);
        }
        )
    },
    async saveUserChanges(){
        var firstname = document.getElementById("editfirstname").value;
        var lastname = document.getElementById("editlastname").value;
        var email = document.getElementById("editemail").value;
        var phone  = document.getElementById("editphone").value;
        var gender = document.getElementById("editgender").value;
        var dateOfBirth = document.getElementById("editdateOfBirth").value;
        var nationality = document.getElementById("editnationality").value;
        var role = document.getElementById("editrole").value;

        const formData = new FormData();
        formData.append("id", this.editUserId);
        formData.append("firstName", firstname);
        formData.append("lastName", lastname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("gender", gender);
        formData.append("dateOfBirth", dateOfBirth);
        formData.append("nationality", nationality);
        formData.append("role", role);

        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        var json = JSON.stringify(object);

        axios.put(API_URL+"api/Users/"+this.editUserId, json, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "'"+SERVER_URL+"'"
        }
        }).then(
        (response)=>{
            this.refreshData();
            alert(response.data);
        console.log(JSON.stringify(response));
        }
        )
    },
    async editUser(userid, firstName, lastName, email, phone, gender, dateOfBirth, nationality, role){
        this.editUserId = userid;
        document.getElementById("editfirstname").value = firstName;
        document.getElementById("editlastname").value = lastName;
        document.getElementById("editemail").value = email;
        document.getElementById("editphone").value = phone;
        document.getElementById("editgender").value = gender;
        document.getElementById("editdateOfBirth").value = dateOfBirth;
        document.getElementById("editnationality").value = nationality;
        document.getElementById("editrole").value = role;

        var x = document.getElementById("editUserDiv");
        x.style.display = "block";
    },
    async deleteUser(userid){
        axios.delete(API_URL+"api/Users/"+userid).then(
            (response)=>{
                this.refreshData();
                alert(response.data);
            }
        )
    },
    async multipleDeletes(){
        this.deleteUsers.forEach(element => {
            axios.delete(API_URL+"api/Users/"+element).then(
            (response)=>{
                this.refreshData();
            }
        )
        });
        alert(response.data);
    },
    async search(){
        var searchString = document.getElementById("search").value;
        axios.get(API_URL+"api/Users/search/"+searchString, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':  "'"+SERVER_URL+"'"
        }
        }).then(
            (response)=>{
                this.users=response.data;
            }
        )
        var x = document.getElementById("editUserDiv");
        x.style.display = "none";
        var y = document.getElementById("addUserDiv");
        y.style.display = "none";
    }
    },mounted:function(){
    this.refreshData();
    }
}).mount('#app')