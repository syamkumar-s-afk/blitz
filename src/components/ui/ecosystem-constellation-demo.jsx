import { useMemo } from 'react';
import { Player } from '@remotion/player';
import { EcosystemConstellation } from '@/components/ui/ecosystem-constellation';

export default function EcosystemConstellationDemo() {
  const props = useMemo(
    () => ({
      speed: 1,
      centerLabel: 'B',
      accentColor: '#3b82f6',
    }),
    [],
  );

  return (
    <div className="flex w-full items-center justify-center overflow-hidden bg-transparent rounded-3xl">
      <div className="w-full">
        <Player
          component={EcosystemConstellation}
          inputProps={props}
          durationInFrames={240}
          fps={30}
          compositionWidth={1280}
          compositionHeight={720}
          autoPlay
          loop
          controls={false}
          clickToPlay={false}
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: '16 / 9',
            borderRadius: 24,
            overflow: 'hidden',
            background: '#050505',
            boxShadow: '0 40px 120px rgba(0,0,0,0.45)',
          }}
        />
      </div>
    </div>
  );
}
