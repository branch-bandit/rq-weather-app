import { BorderOptions, GridLineOptions, RadialLinearScale } from 'chart.js';
import {
  TAU,
  addRoundedRectPath,
  isNullOrUndef,
  renderText,
  toFont,
  toPadding,
  toTRBLCorners,
} from 'chart.js/helpers';

const DEBUG = false;

// TS doesn't like this file at all
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const drawPointLabels = (scale: any, labelCount: number) => {
  const {
    ctx,
    options: { pointLabels },
  } = scale;

  for (let i = labelCount - 1; i >= 0; i--) {
    const optsAtIndex = pointLabels.setContext(scale.getPointLabelContext(i));
    const plFont = toFont(optsAtIndex.font);
    const { x, y, left, top, right, bottom } = scale._pointLabelItems[i];
    const { backdropColor } = optsAtIndex;

    const origin = {
      x,
      y: y + plFont.lineHeight / 2,
    };

    ctx.save();
    ctx.translate(origin.x, origin.y);

    // The reason for having this file is here - we rotate the labels
    ctx.rotate(Math.PI * 2 * (i / labelCount));

    // This part needs to be changed depending on how many labels/axes there are
    if (i !== 0) {
      ctx.rotate(Math.PI);
    }

    const padding = toPadding(optsAtIndex.backdropPadding);

    if (!isNullOrUndef(backdropColor)) {
      const borderRadius = toTRBLCorners(optsAtIndex.borderRadius);

      ctx.fillStyle = backdropColor;

      const backdropWidth = right - left + padding.width;
      const backdropHeight = bottom - top + padding.height;
      const backdropLeft = -backdropWidth / 2 - padding.left;
      const backdropTop = -backdropHeight / 2 - padding.top;

      if (Object.values(borderRadius).some((v) => v !== 0)) {
        ctx.beginPath();
        addRoundedRectPath(ctx, {
          x: backdropLeft,
          y: backdropTop,
          w: backdropWidth,
          h: backdropHeight,
          radius: borderRadius,
        });
        ctx.fill();
      } else {
        ctx.fillRect(backdropLeft, backdropTop, backdropWidth, backdropHeight);
      }
    }

    renderText(
      ctx,
      scale._pointLabels[i],
      -padding.left,
      -padding.top,
      plFont,
      {
        color: optsAtIndex.color,
        textAlign: 'center',
        textBaseline: 'middle',
      }
    );

    if (DEBUG) {
      ctx.fillStyle = 'hsla(180, 100%, 80%, 0.667)';
      ctx.beginPath();
      ctx.arc(0, 0, 30, 0, 2 * Math.PI);
      ctx.fill();
    }

    ctx.restore();
  }
};

const drawRadiusLine = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scale: any,
  gridLineOpts: GridLineOptions,
  radius: number,
  labelCount: number,
  borderOpts: BorderOptions
) => {
  const ctx = scale.ctx;
  const circular = gridLineOpts.circular;

  const { color, lineWidth } = gridLineOpts;

  if ((!circular && !labelCount) || !color || !lineWidth || radius < 0) {
    return;
  }

  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;
  ctx.setLineDash(borderOpts.dash);
  ctx.lineDashOffset = borderOpts.dashOffset;

  ctx.beginPath();
  pathRadiusLine(scale, radius, circular, labelCount);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
};

const pathRadiusLine = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scale: any,
  radius: number,
  circular: boolean,
  labelCount: number
) => {
  const { ctx } = scale;
  if (circular) {
    ctx.arc(scale.xCenter, scale.yCenter, radius, 0, TAU);
  } else {
    let pointPosition = scale.getPointPosition(0, radius);
    ctx.moveTo(pointPosition.x, pointPosition.y);

    for (let i = 1; i < labelCount; i++) {
      pointPosition = scale.getPointPosition(i, radius);
      ctx.lineTo(pointPosition.x, pointPosition.y);
    }
  }
};

class CustomRadialLinearScale extends RadialLinearScale {
  drawGrid() {
    const ctx = this.ctx;
    const opts = this.options;
    // @ts-expect-error - TypeScript doesn't like us rewriting the scale
    const { angleLines, grid, border } = opts;
    // @ts-expect-error - I could write out typings that work for the modified scale,
    // but it's not worth speding time on it if this code will not be re-used
    const labelCount = this._pointLabels.length;

    let i, offset, position;

    if (opts.pointLabels.display) {
      drawPointLabels(this, labelCount);
    }

    if (grid.display) {
      this.ticks.forEach((tick, index) => {
        if (index !== 0) {
          offset = this.getDistanceFromCenterForValue(tick.value);
          // @ts-expect-error - as above
          const context = this.getContext(index);
          //@ts-expect-error - as above
          const optsAtIndex = grid.setContext(context);
          const optsAtIndexBorder = border.setContext(context);

          drawRadiusLine(
            this,
            optsAtIndex,
            offset,
            labelCount,
            optsAtIndexBorder
          );
        }
      });
    }

    if (angleLines.display) {
      ctx.save();

      for (i = labelCount - 1; i >= 0; i--) {
        // @ts-expect-error - as above
        const optsAtIndex = angleLines.setContext(this.getPointLabelContext(i));
        const { color, lineWidth } = optsAtIndex;

        if (!lineWidth || !color) {
          continue;
        }

        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;

        ctx.setLineDash(optsAtIndex.borderDash);
        ctx.lineDashOffset = optsAtIndex.borderDashOffset;

        offset = this.getDistanceFromCenterForValue(
          //@ts-expect-error - as above
          opts.ticks.reverse ? this.min : this.max
        );
        position = this.getPointPosition(i, offset);
        ctx.beginPath();
        //@ts-expect-error - as above
        ctx.moveTo(this.xCenter, this.yCenter);
        ctx.lineTo(position.x, position.y);
        ctx.stroke();
      }

      ctx.restore();
    }
  }
}

CustomRadialLinearScale.id = 'derivedRadialLinearScale';
CustomRadialLinearScale.defaults = RadialLinearScale.defaults;

export default CustomRadialLinearScale;
