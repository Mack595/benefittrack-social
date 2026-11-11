#!/usr/bin/env python3
"""Soundtrack for BenefitTrack animated reels: a calm pad, soft bass, marimba-like plucks
and the house "ting". No whooshes, clicks or thuds.

Usage: python3 music.py music.json out.wav total_seconds

music.json:
{
  "chords": [{"t": 0, "dur": 3.5, "notes": ["A2", "E3", "C4"], "vel": 0.8}],
  "bass":   [{"t": 3.5, "dur": 3.2, "note": "F2", "vel": 0.8}],
  "plucks": [{"t": 1.2, "note": "E5", "vel": 0.7}],
  "pulse":  [{"from": 3.5, "to": 10.5, "every": 0.5833, "notes": ["E4", "A4", "C5", "A4"], "vel": 0.5}],
  "tings":  [1.5, 4.0],
  "fadeOut": 1.4
}
"""
import json, sys
import numpy as np

SR = 48000
NAMES = {'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11}


def hz(name):
    n = NAMES[name[0]]
    i = 1
    if name[i] in '#b':
        n += 1 if name[i] == '#' else -1
        i += 1
    octave = int(name[i:])
    return 440.0 * 2 ** ((n + 12 * (octave + 1) - 69) / 12)


def env(n, a, r, sustain=1.0):
    e = np.full(n, sustain)
    na, nr = min(n, int(a * SR)), min(n, int(r * SR))
    if na: e[:na] = np.linspace(0, sustain, na)
    if nr: e[-nr:] *= np.linspace(1, 0, nr)
    return e


def pad(f, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * d * t + p) for d, p in [(1, 0), (1.003, 1.1), (0.997, 2.3)]) / 3
    s += 0.18 * np.sin(2 * np.pi * 2 * f * t)
    return s * env(n, min(0.9, dur / 3), min(1.2, dur / 2))


def bass(f, dur):
    n = int(dur * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * f * t) + 0.25 * np.sin(4 * np.pi * f * t)) * env(n, 0.05, min(0.8, dur / 2))


def pluck(f, dur=1.2):
    n = int(dur * SR); t = np.arange(n) / SR
    s = np.sin(2 * np.pi * f * t) * np.exp(-t * 5) + 0.3 * np.sin(2 * np.pi * f * 3.98 * t) * np.exp(-t * 14)
    return s * env(n, 0.004, 0.05)


def ting(dur=1.6):
    """The house ting: 1760 Hz with soft inharmonic partials."""
    n = int(dur * SR); t = np.arange(n) / SR
    s = (np.sin(2 * np.pi * 1760 * t) * np.exp(-t * 3.2)
         + 0.35 * np.sin(2 * np.pi * 1760 * 2.76 * t) * np.exp(-t * 7)
         + 0.15 * np.sin(2 * np.pi * 1760 * 5.40 * t) * np.exp(-t * 12))
    return s * env(n, 0.003, 0.1)


def add(buf, sig, t, gain):
    i = int(t * SR)
    if i >= len(buf): return
    j = min(len(buf), i + len(sig))
    buf[i:j] += gain * sig[: j - i]


def reverb(x, mix=0.28):
    y = np.copy(x)
    for d, g in [(0.0297, 0.72), (0.0371, 0.70), (0.0411, 0.68), (0.0437, 0.66)]:
        k = int(d * SR); c = np.copy(x)
        for i in range(k, len(c), k):
            c[i:i + k] += g * c[i - k:i][: len(c[i:i + k])]
        y += c * 0.18
    return (1 - mix) * x + mix * y / 1.7


def lowpass(x, cutoff=5200):
    a = np.exp(-2 * np.pi * cutoff / SR)
    try:
        from scipy.signal import lfilter
        return lfilter([1 - a], [1, -a], x)
    except ImportError:
        y = np.empty_like(x); acc = 0.0
        for i in range(len(x)):
            acc = (1 - a) * x[i] + a * acc; y[i] = acc
        return y


def main():
    spec = json.load(open(sys.argv[1])); total = float(sys.argv[3])
    n = int((total + 0.05) * SR)
    music = np.zeros(n); fx = np.zeros(n)
    for c in spec.get('chords', []):
        for nm in c['notes']:
            add(music, pad(hz(nm), c['dur']), c['t'], 0.10 * c.get('vel', 0.8))
    for b in spec.get('bass', []):
        add(music, bass(hz(b['note']), b['dur']), b['t'], 0.16 * b.get('vel', 0.8))
    for p in spec.get('plucks', []):
        add(music, pluck(hz(p['note'])), p['t'], 0.14 * p.get('vel', 0.7))
    for pl in spec.get('pulse', []):
        t, k = pl['from'], 0
        while t < pl['to'] - 0.05:
            add(music, pluck(hz(pl['notes'][k % len(pl['notes'])]), 0.8), t, 0.08 * pl.get('vel', 0.5))
            t += pl['every']; k += 1
    for t in spec.get('tings', []):
        add(fx, ting(), t, 0.05)
    mix = reverb(lowpass(music) + fx)
    peak = np.max(np.abs(mix)) or 1
    mix = mix / peak * 0.7
    fo = int(spec.get('fadeOut', 1.4) * SR); fi = int(0.25 * SR)
    mix[-fo:] *= np.linspace(1, 0, fo); mix[:fi] *= np.linspace(0, 1, fi)
    pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
    stereo = np.repeat(pcm[:, None], 2, axis=1)
    import wave
    w = wave.open(sys.argv[2], 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes(stereo.tobytes()); w.close()


if __name__ == '__main__':
    main()
