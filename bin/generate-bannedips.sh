#!/bin/bash
for i in {1..20}
do
   ngcp-kamcmd lb htable.sets ipban "11.11.11.$i" 1
done
