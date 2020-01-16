import Swal from 'sweetalert2'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Filter from '../Filter'
import FilterStatistics from '../FilterStatistics'
import BootNav from '../BootNav'
import Spinner from 'react-spinner-children'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Viewer from 'react-viewer'
import face from '../../../resources/face.json'

const customSpinConfig = {
  lines: 10,
};

const useStyles = makeStyles(theme => ({
  hr: {
    width: '100%',
    border: 'none',
    borderBottom: '1px dashed #DaDaDa',
    height: '1px',
    margin: '10px 10px'
  },
  main: {
    margin: theme.spacing(3, 2),
  },
}));

const Emoji = ({
                 faceIsLoading, data, displayImg, pageLimit, currentPage, filterNum, select_tag, toggleTag,
                 toggleCategory, select_category, displayTag, which_page, toggle_display_img, expandCategory,
                 toggle_spin, selectedCategory, selectedTag, search, expandTag
               }) => {
  const [visible, setVisible] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const classes = useStyles();

  face.map(item => {
    item.src = 'https://cdn.gugelong.com/emoji/' +  item.fileName;
    item.alt = item.fileName;

    return item;
  });

  const test = () => {
    Swal.fire({
      title: '搜索',
      input: 'text',
      showCancelButton: true,
      inputPlaceholder: '输入您想搜索的表情',
      inputValidator: (value) => {
        if (!value) {
          return '没有输入！'
        } else {
          search(value);
          Swal.close();
        }
      }
    });
  };

  /**
   * 图片加载完毕，设置 state
   * @param index 第几张图片
   */
  const imgLoaded = (index) => {
    toggle_display_img(index);
  };

  return (
    <Grid container>
      <Button variant="contained" color="primary" onClick={() => test()}>搜索</Button>
      <hr className={classes.hr}/>
      <Filter selectedCategory={selectedCategory} selectedTag={selectedTag} toggleTag={toggleTag} expandTag={expandTag}
              expandCategory={expandCategory} toggleCategory={toggleCategory} displayTag={displayTag}
              select_category={select_category} select_tag={select_tag}/>
      <FilterStatistics
        filterNum={filterNum}
        currentPage={currentPage}
        pageLimit={pageLimit}
      />
      <Grid
        id="emoji"
        container
        justify="center"
        alignItems="flex-end"
        spacing={2}
        style={{marginBottom: 50}}
      >
        {
          data.length > 0 ? (
            data.map((single, index) =>
              <Grid key={index} item xs={4} style={{textAlign: 'center'}}>
                <img id={index} src={"https://cdn.gugelong.com/emoji/" + single["fileName"]} alt={single["name"]}
                     width="100" onLoad={() => imgLoaded(index)}
                     style={displayImg[index] === true ? {} : {visibility: "hidden"}}
                     onClick={() => {
                       setVisible(true);
                       setIndex((currentPage - 1) * pageLimit + index);
                     }}
                />
                <Typography variant="body2" component="h3">
                  {single["name"].split(".")[0]}
                </Typography>
              </Grid>
            )
          ) : (<Grid item style={{margin: '20px 0'}}><h3>没有找到</h3></Grid>)
        }
      </Grid>
      <Viewer
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        images={face}
        activeIndex={index}
      />
      <BootNav filterNum={filterNum} currentPage={currentPage}
               which_page={which_page} pageLimit={pageLimit}/>
      <Spinner
        loaded={!faceIsLoading}
        config={customSpinConfig}
      />
    </Grid>
  )
};

export default Emoji;

