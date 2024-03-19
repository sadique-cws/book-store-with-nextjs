"use server"
import { redirect } from "next/navigation";
import Category from "./models/Category";
import {join} from "path"
import { writeFile } from 'fs/promises';
import Book from '@/app/models/Book';
import User from "./models/User";
import bcrypt from "bcryptjs";
import Address from "./models/Address";


export const handleSubmit = async(formdata) => {
    let catTitle = formdata.get("catTitle");
    let catDesc = formdata.get("catDesc");

    let record = {catTitle, catDesc};

    let data = await Category.create(record);

    redirect("/admin/categories");

}

export const handleSubmitToInsertBook = async (formdata) => {
    "use server"
    let title = formdata.get("title");
    let author = formdata.get("author");
    let price = formdata.get("price");
    let discountPrice = formdata.get("discountPrice");
    let coverImage = formdata.get("coverImage");
    let description = formdata.get("description");
    let category = formdata.get("category");
    
    // image 
    let bytes = await coverImage.arrayBuffer();

    let buffer = Buffer.from(bytes);

    let path = join("./public", "books_image", coverImage.name);

    await writeFile(path, buffer);

    let data = await Book.create({title, author, price, discountPrice, coverImage: coverImage.name, description, category})

    redirect("/admin/books");


}

export const handleBookDelete = async (id, FormData) => {
        let data = await Book.findByIdAndDelete(id);
        redirect("/admin/books");
}
export const handleCatDelete = async (id, FormData) => {
        let data = await Category.findByIdAndDelete(id);
        redirect("/admin/categories");
}

export const handleCreateAnAccount = async (formData) => {
        let name = formData.get('name');
        let email = formData.get('email');

        let salt = await bcrypt.genSalt(10);

        let password = await bcrypt.hash(formData.get('password'), salt);

        let contact = formData.get('contact');

        let record = {name, email, password, contact};
        let data = await User.create(record);
        redirect("/");

}

export const handleCreateAddresses = async(formData) => {
        let name = formData.get('name');
        let contact = formData.get('contact');
        let city = formData.get('city');
        let state = formData.get('state');
        let landmark = formData.get('landmark');
        let pincode = formData.get('pincode');
        let area = formData.get('area');

        let record = {name, contact, city, state, landmark, pincode, area};
        let data = await Address.create(record);
}