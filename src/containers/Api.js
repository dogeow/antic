import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const Api = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography component="h2" variant="h2">
          API
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          {process.env.REACT_APP_API_URL}ip
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="h3" variant="h3">
          所有 API
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography component="ul">
          <li>html_sc/{`<string>`}</li>
          <li>secret/{`<string>`}</li>
          <li>md5/{`<md5>`}</li>
          <li>ip/[ip]</li>
          <li>timestamp/[timestamp]</li>
          <li>hash/{`<hash>`}</li>
          <li>date/[date]</li>
          <li>银行卡 银行卡查询 /bankcard/{`<cardNo>`}</li>
          <li>图片 图片下载或获取 URL image/{`<action=download|url>`}</li>
          <li>/base64_encode/{`<string>`}</li>
          <li>/base64_decode/{`<string>`}</li>
          <li>/url_encode/{`<string>`}</li>
          <li>/url_decode/{`<string>`}</li>
          <li>/utf8_to_unicode/{`<string>`}</li>
          <li>/unicode_to_utf8/{`<string>`}</li>
          <li>中文域名转码 /punycode/{`<string>`}</li>
        </Typography>
      </Grid>
    </Grid>
  )
};

export default Api;
