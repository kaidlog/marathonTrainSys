/**
 *
 */
export default function(mock) {
  /**
   *
   */
  mock.onPost("/f010101/01").reply(200, {
    status: "200",
    msg: ["lalala"],
    body: []
  });
}
