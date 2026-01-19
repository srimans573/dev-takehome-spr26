import { NextResponse } from "next/server";
import { connectDB, Request } from "@/database/mongodb";
import { PAGINATION_PAGE_SIZE } from "@/lib/constants/config";
import { HTTP_STATUS_CODE } from "@/lib/types/apiResponse";

//some optimizations i could make
// cache the mongodb connection so i dont call it on every func call
// but i have logic to check if a connection ahs already been made in mongodb.js, so its fine

//step4
export async function GET(request: Request) {
  try {
    //get the page number from the url
    const url = new URL(request.url);
    const pageParam = url.searchParams.get("page");
    const page = pageParam ? parseInt(pageParam) : 1;
    const statusParam = url.searchParams.get("status");
    const status = statusParam ? statusParam : "all";

    //check if page number is valid in terms of the input
    //i.e. it's not null or less than1..
    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "Invalid input was received." },
        { status: HTTP_STATUS_CODE.BAD_REQUEST },
      );
    }

    await connectDB();

    const pageSize = PAGINATION_PAGE_SIZE;
    const totalRecords =
      status == "all"
        ? await Request.countDocuments()
        : await Request.countDocuments({ status: status });
    const totalPages = Math.ceil(totalRecords / pageSize) || 1;

    if (page > totalPages) {
      return NextResponse.json({ data: [] }, { status: HTTP_STATUS_CODE.OK });
    }
    //status param filtering
    const docs =
      status == "all"
        ? await Request.find()
            .sort({ createdDate: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .lean()
        : await Request.find({ status: status })
            .sort({ createdDate: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize)
            .lean();

    return NextResponse.json(
      { data: docs, totalRecords: totalRecords },
      { status: HTTP_STATUS_CODE.OK },
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "An unknown error ocurred." },
      { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR },
    );
  }
}

//step 3 PUT request
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { requestorName, itemRequested } = body;
    if (
      !requestorName ||
      !itemRequested ||
      typeof requestorName !== "string" ||
      typeof itemRequested !== "string" ||
      requestorName.length < 3 ||
      requestorName.length > 30 ||
      itemRequested.length < 2 ||
      itemRequested.length > 100
    ) {
      return NextResponse.json(
        { error: "Invalid input was received." },
        { status: HTTP_STATUS_CODE.BAD_REQUEST.valueOf() },
      );
    }
   
    await connectDB();

    const doc = {
      requestorName,
      itemRequested,
      createdDate: new Date(),
      lastEditedDate: new Date(),
      status: "pending",
    };

    await Request.create(doc);

    return NextResponse.json("Request processed successfully.", {
      status: HTTP_STATUS_CODE.OK.valueOf(),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "An unknown error ocurred." },
      { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR.valueOf() },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status || typeof status !== "string") {
      return NextResponse.json(
        { error: "Invalid input was received." },
        { status: HTTP_STATUS_CODE.BAD_REQUEST.valueOf() },
      );
    }

    await connectDB();

    await Request.updateOne(
      { ID: id },
      { status: status, lastEditedDate: new Date() },
    );

    return NextResponse.json("Request processed successfully.", {
      status: HTTP_STATUS_CODE.OK.valueOf(),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "An unknown error ocurred." },
      { status: HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR.valueOf() },
    );
  }
}
