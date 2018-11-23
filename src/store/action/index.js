import * as login from "./login/index"
import * as end from "./end/index"
import * as put from "./put/index"
import * as home from "./home/index"
import * as report from "./report/index"
import * as ordre from "./order/index"
import * as resource from "./resource/index"


import _ from "lodash";

export default _.assign(login, end, home, put, report,ordre,resource);
