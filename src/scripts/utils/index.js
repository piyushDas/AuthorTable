/*
  Checks useragent of the browser used to determine
  whether its a mobile device or desktop
*/
export const checkMobileDevice = () => {
    let returnVal = false
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent)) {
        returnVal = true
    }
    return returnVal
}