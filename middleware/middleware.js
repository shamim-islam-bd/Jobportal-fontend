// const { NextResponse } = require("next/server");

// const allowedParams = [
//   "keyword",
//   "location",
//   "page",
//   "education",
//   "experience",
//   "salary",
//   "jobType",
// ];

// function middleware(req) {
//   const url = req.nextUrl;
//   let changed = false;

//   url.searchParams.forEach((value, key) => {
//     if (!allowedParams.includes(key)) {
//       url.searchParams.delete(key);
//       changed = true;
//     }
//   });

//   if (changed) {
//     return NextResponse.redirect(url);
//   }
// }

// module.exports = { middleware };
