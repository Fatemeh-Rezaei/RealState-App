import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Profile from "@/models/Profile";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("body", body);
    const {
      title,
      description,
      location,
      phone,
      price,
      realState,
      constructionDate,
      category,
      rules,
      amenities,
    } = body;

    const session = await getServerSession(req);
    console.log("session", session);
    if (!session) {
      return NextResponse.json(
        { error: "لطفا وارد حساب کاربری خود بشید" },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    console.log("user", user);

    if (!user) {
      return NextResponse.json(
        { error: "حساب کاربری شما یافت نشد" },
        { status: 404 }
      );
    }

    if (
      !title ||
      !description ||
      !location ||
      !phone ||
      !price ||
      !realState ||
      !constructionDate ||
      !category
    ) {
      return NextResponse.json(
        { error: "لطفا اطلاعات معتبر وارد کنید" },
        { status: 400 }
      );
    }

    const newProfile = await Profile.create({
      title,
      description,
      location,
      phone,
      price: +price,
      realState,
      constructionDate,
      category,
      amenities,
      rules,
      userId: new Types.ObjectId(user._id),
    });

    console.log(newProfile);

    return NextResponse.json(
      { message: "آگهی جدید اضافه شد" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "مشکلی در سرور رخ داده است",
      },
      { status: 500 }
    );
  }
}
