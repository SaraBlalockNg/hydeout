---
layout: page
title: Modeling the time course of cue weighting angle calculations
sidebar_link: false
---

## Poster

I presented [this poster](docs/ASA_cue_profile.pdf) of my efforts to shorten the cue profile at the ASA in Seattle 2021.

## Additional Notes

### Operationalizing accuracy of ambiguous stimulus/response pairs

![grid of stimuli and responses](imgs/grid_accuracy_cue_profile.eps)

Because there isn't a true sense of accuracy for the synthesized continnua of spectrotemporal and amplitude envelope variation, we develop a notion of ``grid accuracy,'' which captures the gradient ability of the listener to attend to salient cues.  The schematic above shows how accuracy is calculated in seven dimensions for a listener.

The accuraccy vector begins as a 7-dimensional zero vector:

$$\left[\begin{array}{c}
0 \\ 0 \\ 0 \\ 0 \\ 0 \\ 0 \\ 0 
\end{array}\right]$$

Each trial consists of a stimulus and response.  To increment the accuracy vector, we locate the position of the stimulus on the grid.  If the text for that cell contains a (response, n) pair corresponding to the given response, the nth dimension of the vector is incremented by one.


### Misc

This project is very much ongoing!  Please email me directly for access to code or to discuss.
