import vscode from '@/assets/images/VS Code.png'
import warp from '@/assets/images/Warp.png'
import figma from '@/assets/images/Figma.png'
import obs from '@/assets/images/OBS Studio.png'
import epidemic from '@/assets/images/Epidemic Sound.png'
import finalcut from '@/assets/images/Final Cut Pro.webp'
import cleanshot from '@/assets/images/CleanShot X.png'
import screenstudio from '@/assets/images/Screen Studio.png'
import spotify from '@/assets/images/Spotify.png'
import netease from '@/assets/images/NetEase Cloud Music.png'
import dtd from '@/assets/images/Dtd Playlist.png'

interface WorkspaceItem {
  name: string
  desc: string
  icon: string
}

// @unocss-include
export default {
  Coding: [
    {
      name: 'VS Code',
      desc: 'Code editing. Redefined.',
      icon: vscode,
    },
    {
      name: 'Warp',
      desc: 'The terminal for the 21st century.',
      icon: warp,
    },
  ],
  Designing: [
    {
      name: 'Figma',
      desc: 'The collaborative interface design tool.',
      icon: figma,
    },
  ],
  'Streaming and Video Editing': [
    {
      name: 'OBS Studio', 
      desc: 'Free and open source software for video recording and live streaming.',
      icon: obs,
    },
    {
      name: 'Epidemic Sound', 
      desc: 'Royalty Free Music for Video Creators',
      icon: epidemic,
    },
    {
      name: 'Final Cut Pro', 
      desc: 'Professional video editing for macOS',
      icon: finalcut,
    },
    {
      name: 'CleanShot X', 
      desc: 'Screen capture and recording software for Mac.',
      icon: cleanshot,
    },
    {
      name: 'Screen Studio', 
      desc: 'Screen Recorder for macOS. Beautiful videos in minutes.',
      icon: screenstudio,
    },
  ],
  Entertainment: [
    {
      name: 'Spotify',
      desc: 'Digital music service that gives you access to millions of songs.',
      icon: spotify,
    },
    {
      name: 'NetEase Cloud Music',
      desc: 'Music streaming service developed and owned by NetEase, Inc.',
      icon: netease,
    },
    {
      name: 'Dtd Playlist',
      desc: 'Daily Mood Music.',
      icon: dtd,
    },
  ],
} as Record<string, WorkspaceItem[]>
