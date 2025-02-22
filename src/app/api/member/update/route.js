import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/AuthOptions";
import { updateMemberInfo } from "@/database/queries/user/updateMemberInfo";
// import { updateUserAccountImage } from "@/database/queries/photo/updateUserProfileImage";
// import sharp from "sharp";
import { checkFieldAlreadyExists } from "@/database/queries/user/checkFieldAlreadyExists";

export const PATCH = async (req) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {
        // Parse the request for JSON or form-data
        const contentType = req.headers.get("content-type") || "";
        let username, 
            email, 
            first_name, 
            last_name, 
            password, 
            confirmedPassword, 
            dob, 
            phone,
            description; // Later: image, phone,

        if (contentType.includes("application/json")) {
            const body = await req.json();
            username = body.username;
            email = body.email;
            first_name = body.first_name;
            last_name = body.last_name;
            password = body.password;
            confirmedPassword = body.confirmedPassword;
            phone = body.phone;
            dob = body.dob;
            description = body.description;
        } else if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData();
            username = formData.get("username");
            email = formData.get("email");
            first_name = formData.get("first_name");
            last_name = formData.get("last_name");
            password = formData.get("password");
            confirmedPassword = formData.get("confirmedPassword");
            // image = formData.get("file");
            phone = formData.get("phone");
            dob = formData.get("dob");
            description = formData.get("description");
        }

        // Ensure only non-empty fields
        if (!username && !email && !first_name && !last_name && !password && !dob && !phone && !description) { // && !image 
            return NextResponse.json({ message: "No fields to update" }, { status: 400 });
        }

        // Validate and process user data
        if (username) {
            const isUsernameTaken = await checkFieldAlreadyExists("Users", "username", username);
            if (isUsernameTaken[0]) {
                return NextResponse.json({ status: "error", message: "Username is already in use by another account" }, { status: 400 });
            }
            if ((username).length > 25) {
                return NextResponse.json({ status: "error", message: "Username can only be 25 characters long" }, { status: 400 });
            }
        }

        if (email) {
            const isEmailTaken = await checkFieldAlreadyExists("Users", "email", email);
            if (isEmailTaken[0]) {
                return NextResponse.json({ status: "error", message: "Email is already in use by another account" }, { status: 400 });
            }
        }

        if (password && (password).length < 8) {
            return NextResponse.json({ status: "error", message: "Password must be more than 8 characters long" }, { status: 400 });
        }

        if (password && password !== confirmedPassword) {
            return NextResponse.json({ status: "error", message: "Passwords do not match" }, { status: 400});
        }

        const updateData = {};
        if (username) updateData.username = username;
        if (email) updateData.email = email;
        if (first_name) updateData.first_name = first_name;
        if (last_name) updateData.last_name = last_name;
        if (password && password === confirmedPassword) updateData.password = password;
        if (phone) updateData.phone = phone;
        if (dob) updateData.dob = dob;
        if (description) updateData.description = description;

        if (Object.keys(updateData).length > 0) {
            const detailsUpdated = await updateMemberInfo(session.user.mid, updateData);
            if (!detailsUpdated) {
                return NextResponse.json({ message: "Failed to update user details" }, { status: 500 });
            }
        }

        // if (image) {
        //     // Limit file to only image types
        //     const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
        //     if (!allowedMimeTypes.includes(image.type)) {
        //         return NextResponse.json(
        //             { message: "Invalid file type. Only PNG, JPG, JPEG, and WEBP files are allowed." },
        //             { status: 400 }
        //         );
        //     }

        //     try {
        //         const imageData = Buffer.from(await image.arrayBuffer());
        //         const MAX_FILE_SIZE = 1000000; // 100KB
        //         const MIN_QUALITY = 10;
        //         const RESIZE_DIMENSIONS = 300;

        //         // Resize image before compressing
        //         const resizedImage = await sharp(imageData)
        //             .resize({ width: RESIZE_DIMENSIONS, height: RESIZE_DIMENSIONS, fit: "inside" })
        //             .toBuffer();

        //         // Compress the resized image
        //         let quality = 50;
        //         let compressedImage = resizedImage;

        //         while (compressedImage.length > MAX_FILE_SIZE && quality > MIN_QUALITY) {
        //             compressedImage = await sharp(resizedImage)
        //                 .jpeg({ quality })
        //                 .toBuffer();
        //             quality -= 10;
        //         }

        //         if (compressedImage.length > MAX_FILE_SIZE) {
        //             return NextResponse.json(
        //                 { message: `Unable to compress image to ${MAX_FILE_SIZE / 1024}KB. Try uploading a smaller file.` },
        //                 { status: 400 }
        //             );
        //         }

        //         // const result = 
        //         await updateUserAccountImage(session.user.mid, compressedImage);

        //         // console.log(result)

        //     } catch (error) {
        //         console.error("Error occurred while uploading file:", error);
        //         return NextResponse.json({ message: "Failed to upload file", status: 500 });
        //     }
        // }


        // Update the session manually
        const updatedSession = await getServerSession(authOptions);
        // console.log(updatedSession)
        if (updatedSession) {
            return NextResponse.json({
                message: "User details updated successfully",
                user: {
                    username: username || session.user.username,
                    email: email || session.user.email,
                    first_name: first_name || session.user.first_name,
                    last_name: last_name || session.user.last_name,
                },
                refresh: true,
            }, { status: 200 });
        } else {
            return NextResponse.json({ message: "Failed to refresh session" }, { status: 500 });
        }
    } catch (error) {
        console.error("Error updating user details or image:", error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};
