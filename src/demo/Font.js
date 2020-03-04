import React from 'react'
import Typography from '@material-ui/core/Typography'

const type = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'button', 'caption', 'overline'];

const Font = () => (
  <div>
    {type.map((item) => (
      <Typography variant={item} component="h2">
        马斯克的<span role="img" aria-label="火箭飞离地球">🌍🚀</span>是人类未来的基石，Written in 2020。
      </Typography>
    ))
    }
  </div>
);

export default Font;
