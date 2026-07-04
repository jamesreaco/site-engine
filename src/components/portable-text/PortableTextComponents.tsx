import Video from './components/Video';
import SingleImage from './components/SingleImage';
import CallToAction from './components/CallToAction';
import { PortableTextComponents } from '@portabletext/react';
import { portableTextHeadings } from './components/Headings';

export const portableTextComponents: PortableTextComponents = {
  types: {
    callToActionObject: (data) => {
      return <CallToAction data={data.value} />
    },
    singleImageObject: (data) => {
      return <SingleImage data={data.value}/>
    },
    videoObject: (data) => {
      return <Video data={data.value}/>
    }
  },
  block: {
    ...portableTextHeadings
  },
};