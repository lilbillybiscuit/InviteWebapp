import moment from "moment";

const globalVariables = {
  api_domain: process.env.REACT_APP_WEBSITE_URL ?? "http://localhost:8000",
  PARTY_START: moment(new Date("2022-08-07T16:00:00-0400")),
  PARTY_END: moment(new Date("2022-08-07T22:00:00-0400")), //eastern daylight time
}
console.log(globalVariables);
export default globalVariables;