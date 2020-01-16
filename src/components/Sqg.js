import React, { useState, useEffect } from 'react'
import Input from '@material-ui/core/Input'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover'
import ClipboardJS from 'clipboard'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    border: '1px solid',
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
}));

const Sqg = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [popover, setPopover] = React.useState(null);
  const [value, setValue] = useState('');
  const [taokouling, setTaokouling] = useState(null);
  const [title, setTitle] = useState(null);
  const [itemendprice, setItemendprice] = useState(null);
  const [itemprice, setItemprice] = useState(null);
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    let clipboard = new ClipboardJS('.btn',
      {
        text: function () {
          return `${title}\n【❥自己买】：${itemprice}元\n【❥跟我买】：${itemendprice}元\n长按複製❥ ${taokouling} 打開taobao`;
        }
      });

    clipboard.on('success', function (e) {
      setPopover('复制成功☑️');
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);

      e.clearSelection();
    });

    clipboard.on('error', function (e) {
      setPopover('复制失败✖️');
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
  }, [taokouling, itemendprice, itemprice, title]);

  const Search = () => {
    let data = new FormData();
    data.append('keyword', value);

    axios.post('http://admin.sqg.tewan.com/api/search/search_goods_list', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then((resp) => {
      console.log(resp.data);
      setData(resp.data.data);
      setTitle(null);
      setItemprice(null);
      setItemendprice(null);
      setTaokouling(null);
    })
  };

  const getTaokouling = (itemid, title, itemendprice, itemprice) => {
    let data = new FormData();
    data.append('itemid', itemid);
    data.append('title', title);

    axios.post('http://admin.sqg.tewan.com/api/goods/create_tao_kouling', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then((resp) => {
      console.log(resp.data);
      setTitle(title);
      setItemendprice(itemendprice);
      setItemprice(itemprice);
      setTaokouling(resp.data.data);
    })
  };

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Grid container spacing={3} alignItems={"center"}>
        <Grid item>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="搜索商品"
            inputProps={{
              'aria-label': 'description',
            }}
          />
          <IconButton aria-label="search" onClick={() => Search()}>
            <SearchIcon/>
          </IconButton>
        </Grid>
        <Grid item><Typography>淘口令：{taokouling}</Typography></Grid>
        <Grid item>
          <Button className={'btn'} variant="contained" color="primary" onClick={handleClick}>复制淘口令</Button>
          <Popover
            id={id} open={open} anchorEl={anchorEl} onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <div className={classes.paper}><Typography>{popover}</Typography></div>
          </Popover>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {
          data && data.map((item, index) => {
            return (
              <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
                <div>
                  <img src={item.image} width={155} alt={item.itemtitle} style={{maxWidth: '100%'}}
                       onClick={() => getTaokouling(item.itemid, item.itemtitle, item.itemendprice, item.itemprice)}
                       data-clipboard-text={taokouling}
                  />
                </div>
                <div>{item.shoptype === 'c' ?
                  <img src="/images/sqg/platform/taobao.png" width="20px" alt="淘宝"/>
                  :
                  <img src="/images/sqg/platform/tmall.png" width="20px" alt="天猫"/>}
                  {item.itemtitle}</div>
                <div>月销：{item.itemsale}</div>
                <div>
                  <strong style={{color: 'red'}}>¥{item.itemendprice}</strong>
                  <del style={{color: '#3c3c3c', paddingLeft: 20}}>¥{item.itemprice}</del>
                  <span style={{float: 'right'}}>{item.couponmoney}</span>
                </div>
                <Grid container>
                  <Grid item xs={6} style={{color: 'white', backgroundColor: 'black'}}>分享赚¥{item.common_money}</Grid>
                  <Grid item xs={6} style={{color: 'white', backgroundColor: 'red'}}>升级赚¥{item.high_money}</Grid>
                </Grid>
                <div>{item.shopname}</div>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  )
};

export default Sqg;
